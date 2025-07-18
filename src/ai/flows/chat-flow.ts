
'use server';

import type { HistoryItem } from '@/ai/types';
import { ai } from '@/ai/genkit';
import fs from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import wav from 'wav';
import { getSystemPrompt } from '@/chatbot/chatbot-prompt';
import { retrieveKnowledge } from '@/chatbot/knowledge-retriever';

const logDirectory = path.join(process.cwd(), 'src', 'chatbot');
const logFilePath = path.join(logDirectory, 'chatbot.log');

let isInitialized = false;

async function initializeChatSystem() {
    if (isInitialized) return;

    if (process.env.TRACE === 'ON') {
        try {
            // Ensure the directory exists.
            await fs.mkdir(logDirectory, { recursive: true });
            
            // Check if file exists by trying to append to it. If it doesn't exist, it will be created.
            // This is simpler and more atomic than checking for existence first.
            await fs.appendFile(logFilePath, '');
            
            console.log('Chat tracing is ON. Log file is at:', logFilePath);
        } catch (error) {
            console.error('Error ensuring log file exists:', error);
            // If we can't write the log, we disable tracing for this session but don't crash.
            process.env.TRACE = 'OFF'; 
        }
    }
    isInitialized = true;
}

async function logTrace(functionName: string, data: any, sessionId?: string) {
    if (process.env.TRACE === 'ON') {
        const now = new Date();
        const pad = (num: number) => num.toString().padStart(2, '0');
        const timestamp = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        
        const headerList = headers();
        const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
        
        const logData = { ip, ...data };
        const idPart = sessionId ? `[id:${sessionId}]` : '';
        const logMessage = `[${timestamp}]${idPart} uhurulog_${functionName}: ${JSON.stringify(logData)}\n`;

        try {
            await fs.appendFile(logFilePath, logMessage);
        } catch (error) {
            console.error('Failed to write to chatbot.log', error);
        }
    }
}

export async function chat(
  newUserMessage: string, 
  history: HistoryItem[],
  isVoiceInput: boolean,
  sessionId: string
): Promise<{ text: string; audioDataUri?: string }> {
    await initializeChatSystem();

    const functionName = 'chat';
    const logPayload: any = {
      history: history.map(h => h.content),
      isVoiceInput
    };
    if (isVoiceInput) logPayload.InputAudio = newUserMessage;
    else logPayload.input_newUserMessage = newUserMessage;
    await logTrace(functionName, logPayload, sessionId);

    try {
        // 1. Retrieve the most relevant knowledge based on the user's message.
        const knowledgeContext = await retrieveKnowledge(newUserMessage);
        logTrace(functionName, { retrieved_knowledge_length: knowledgeContext.length }, sessionId);

        // 2. Get the system prompt with the retrieved context.
        const systemPrompt = getSystemPrompt(knowledgeContext);
        
        await logTrace(functionName, { system_prompt_length: systemPrompt.length }, sessionId);

        const chatHistory = history.map(item => ({
            role: item.role === 'assistant' ? 'model' : 'user',
            content: [{ text: item.content }]
        }));

        await logTrace(functionName, { status: 'calling_ai_generate' }, sessionId);
        const response = await ai.generate({
            model: googleAI.model('gemini-1.5-flash-latest'),
            history: chatHistory,
            prompt: newUserMessage,
            system: systemPrompt,
        });

        const responseText = response.text;
        await logTrace(functionName, { output_ai_response: responseText }, sessionId);

        if (isVoiceInput) {
            const { media: audioDataUri } = await textToSpeech(responseText, sessionId);
            return { text: responseText, audioDataUri };
        }

        return { text: responseText };

    } catch (error) {
        const errorMessage = error instanceof Error ? `Sorry, there was a problem: ${error.message}` : "Sorry, I couldn't connect to the assistant at this time. Please try again later.";
        await logTrace(functionName, { output_error: errorMessage }, sessionId);
        return { text: errorMessage };
    }
}

const ttsFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: z.object({
      text: z.string(),
      sessionId: z.string().optional(),
    }),
    outputSchema: z.object({
        media: z.string().describe("The base64 encoded WAV audio data URI."),
    }),
  },
  async ({ text, sessionId }) => {
    if (!text) return { media: '' };
    await logTrace('textToSpeech', { input_text: text }, sessionId);
    
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Charon' },
          },
        },
      },
      prompt: text,
    });

    if (!media) throw new Error('No audio media was returned from the TTS model.');

    const audioBuffer = Buffer.from(media.url.substring(media.url.indexOf(',') + 1), 'base64');
    const wavBase64 = await toWav(audioBuffer);
    return { media: `data:audio/wav;base64,${wavBase64}` };
  }
);

export async function textToSpeech(text: string, sessionId?: string): Promise<{ media: string }> {
    await initializeChatSystem();
    return ttsFlow({ text, sessionId });
}

const sttFlow = ai.defineFlow(
    {
        name: 'speechToTextFlow',
        inputSchema: z.object({
            audioDataUri: z.string().describe("The base64 encoded audio data URI."),
            sessionId: z.string().optional(),
        }),
        outputSchema: z.object({
            text: z.string().describe("The transcribed text."),
        }),
    },
    async ({ audioDataUri, sessionId }) => {
        await logTrace('speechToText_start', { input_audio_received: true }, sessionId);
        const response = await ai.generate({
            model: googleAI.model('gemini-1.5-flash-latest'),
            prompt: [
                { text: "Transcribe the following audio recording to text." },
                { media: { url: audioDataUri } },
            ],
        });
        const transcribedText = response.text;
        await logTrace('speechToText_end', { output_transcribed_text: transcribedText });
        return { text: transcribedText };
    }
);

export async function speechToText(audioDataUri: string, sessionId: string): Promise<{ text: string }> {
    await initializeChatSystem();
    return sttFlow({ audioDataUri, sessionId });
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({ channels, sampleRate: rate, bitDepth: sampleWidth * 8 });
    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', d => bufs.push(d));
    writer.on('end', () => resolve(Buffer.concat(bufs).toString('base64')));
    writer.write(pcmData);
    writer.end();
  });
}
