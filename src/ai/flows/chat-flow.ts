
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
        const logMessage = `[${timestamp}] uhurulog_${functionName}: ${JSON.stringify(data)}\n`;
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

export async function chat(newUserMessage: string, history: HistoryItem[]): Promise<string> {
    const functionName = 'chat';
    const headerList = headers();
    const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
    
    await logTrace(functionName, { ip, input_newUserMessage: newUserMessage, input_history: history });

    const chatHistory = history.map(item => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        content: [{ text: item.content }]
    }));

    const knowledgePrompt = await buildKnowledgePrompt();
    const systemPrompt = getSystemPrompt(knowledgePrompt);

    try {
        await logTrace(functionName, { ip, status: 'calling_ai_generate' });
        const response = await ai.generate({
            model: googleAI.model('gemini-1.5-flash-latest'),
            history: chatHistory,
            prompt: newUserMessage,
            system: systemPrompt,
        });

        await logTrace(functionName, { ip, output_ai_response: response.text });
        return response.text;

    } catch (error) {
        const errorMessage = error instanceof Error ? `Sorry, there was a problem: ${error.message}` : "Sorry, I couldn't connect to the assistant at this time. Please try again later.";
        await logTrace(functionName, { ip, output_error: errorMessage });
        return errorMessage;
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
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: text,
    });

    if (!media) {
      throw new Error('No audio media was returned from the TTS model.');
    }

    // The media URL is a data URI with base64 encoded PCM data
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

    