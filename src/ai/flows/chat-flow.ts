
'use server';

import type { HistoryItem } from '@/ai/types';
import { ai } from '@/ai/genkit';
import fs from 'fs/promises';
import path from 'path';
import { buildKnowledgePrompt } from '@/chatbot/chatbot-knowledge';
import { getSystemPrompt } from '@/chatbot/chatbot-prompt';
import { headers } from 'next/headers';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'zod';
import wav from 'wav';

async function logTrace(functionName: string, data: any) {
    if (process.env.TRACE === 'ON') {
        const timestamp = new Date().toISOString();
        const headerList = headers();
        const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
        
        const logData = { ip, ...data };
        const logMessage = `[${timestamp}] uhurulog_${functionName}: ${JSON.stringify(logData)}\n`;

        try {
            const logDirectory = path.join(process.cwd(), 'src', 'chatbot');
            const logFilePath = path.join(logDirectory, 'chatbot-log.log');
            await fs.mkdir(logDirectory, { recursive: true });
            await fs.appendFile(logFilePath, logMessage);
        } catch (error) {
            console.error('Failed to write to chatbot-log.log', error);
        }
    }
}

export async function chat(
  newUserMessage: string, 
  history: HistoryItem[],
  isVoiceInput: boolean
): Promise<{ text: string; audioDataUri?: string }> {
    const functionName = 'chat';

    const logPayload: any = {
      history: history.map(h => h.content),
      isVoiceInput
    };

    if (isVoiceInput) {
      logPayload.InputAudio = newUserMessage;
    } else {
      logPayload.input_newUserMessage = newUserMessage;
    }
    
    await logTrace(functionName, logPayload);

    const chatHistory = history.map(item => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        content: [{ text: item.content }]
    }));

    const knowledgePrompt = await buildKnowledgePrompt();
    const systemPrompt = getSystemPrompt(knowledgePrompt);

    try {
        await logTrace(functionName, { status: 'calling_ai_generate' });
        const response = await ai.generate({
            model: googleAI.model('gemini-1.5-flash-latest'),
            history: chatHistory,
            prompt: newUserMessage,
            system: systemPrompt,
        });

        const responseText = response.text;
        await logTrace(functionName, { output_ai_response: responseText });

        if (isVoiceInput) {
            const { media: audioDataUri } = await textToSpeech(responseText);
            return { text: responseText, audioDataUri };
        }

        return { text: responseText };

    } catch (error) {
        const errorMessage = error instanceof Error ? `Sorry, there was a problem: ${error.message}` : "Sorry, I couldn't connect to the assistant at this time. Please try again later.";
        await logTrace(functionName, { output_error: errorMessage });
        return { text: errorMessage };
    }
}

const ttsFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: z.string(),
    outputSchema: z.object({
        media: z.string().describe("The base64 encoded WAV audio data URI."),
    }),
  },
  async (text) => {
    if (!text) {
        return { media: '' };
    }
    await logTrace('textToSpeech', { input_text: text });
    
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

    if (!media) {
      throw new Error('No audio media was returned from the TTS model.');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    return {
      media: `data:audio/wav;base64,${wavBase64}`,
    };
  }
);

export async function textToSpeech(text: string): Promise<{ media: string }> {
    return ttsFlow(text);
}

const sttFlow = ai.defineFlow(
    {
        name: 'speechToTextFlow',
        inputSchema: z.object({
            audioDataUri: z.string().describe("The base64 encoded audio data URI."),
        }),
        outputSchema: z.object({
            text: z.string().describe("The transcribed text."),
        }),
    },
    async ({ audioDataUri }) => {
        const response = await ai.generate({
            model: googleAI.model('gemini-1.5-flash-latest'),
            prompt: [
                { text: "Transcribe the following audio recording to text." },
                { media: { url: audioDataUri } },
            ],
        });
        const transcribedText = response.text;
        return { text: transcribedText };
    }
);

export async function speechToText(audioDataUri: string): Promise<{ text: string }> {
    await logTrace('speechToText', { input_audio_received: true });
    return sttFlow({ audioDataUri });
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
