
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
import { processDocument } from './file-processing-flow';

const logFilePath = path.join(process.cwd(), 'src', 'chatbot', 'chatbot.log');

const languageCodeMap: { [key: string]: string } = {
    'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'it': 'Italian',
    'pt': 'Portuguese', 'ru': 'Russian', 'zh': 'Chinese', 'ja': 'Japanese', 'ar': 'Arabic',
    'hi': 'Hindi', 'bn': 'Bengali', 'pa': 'Punjabi', 'jv': 'Javanese', 'ko': 'Korean',
    'vi': 'Vietnamese', 'te': 'Telugu', 'mr': 'Marathi', 'tr': 'Turkish', 'ta': 'Tamil',
    'ur': 'Urdu', 'gu': 'Gujarati', 'pl': 'Polish', 'uk': 'Ukrainian', 'nl': 'Dutch',
    'ms': 'Malay', 'sv': 'Swedish', 'fi': 'Finnish', 'no': 'Norwegian', 'da': 'Danish',
    'el': 'Greek', 'he': 'Hebrew', 'id': 'Indonesian', 'th': 'Thai', 'cs': 'Czech',
    'hu': 'Hungarian', 'ro': 'Romanian', 'sk': 'Slovak', 'bg': 'Bulgarian'
};

async function logTrace(functionName: string, data: any, sessionId?: string, languageCode?: string) {
    if (process.env.TRACE === 'ON') {
        try {
            const now = new Date();
            const pad = (num: number) => num.toString().padStart(2, '0');
            const timestamp = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            
            const headerList = headers();
            const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
            
            let country = 'N/A';
            try {
                const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
                if (geoResponse.ok) {
                    const geoData = await geoResponse.json();
                    country = geoData.countryCode || 'N/A';
                }
            } catch (geoError) {
                console.error('IP Geolocation failed:', geoError);
            }

            const idPart = sessionId ? `[id:${sessionId}]` : '';
            const languageName = languageCode ? languageCodeMap[languageCode.toLowerCase()] || languageCode : '';
            const langPart = languageName ? `[language:${languageName}]` : '';
            const countryPart = `[country:${country}]`;
            const ipPart = `[ip:${ip}]`;

            const logMessage = `[${timestamp}]${idPart}${langPart}${countryPart}${ipPart} uhurulog_${functionName}: ${JSON.stringify(data)}\n`;

            await fs.appendFile(logFilePath, logMessage);
        } catch (error) {
            console.error('Failed to write to chatbot.log', error);
        }
    }
}

async function detectLanguage(text: string): Promise<string> {
    try {
        const response = await ai.generate({
            model: googleAI.model('gemini-1.5-flash-latest'),
            prompt: `Detect the language of the following text and respond only with its two-letter ISO 639-1 code (e.g., "en", "es", "fr"). Text: "${text}"`,
            config: { temperature: 0 },
        });
        return response.text.trim().toLowerCase();
    } catch (error) {
        console.error("Language detection failed:", error);
        return 'N/A'; // Return a default value on failure
    }
}

export async function chat(
  newUserMessage: string, 
  history: HistoryItem[],
  isVoiceInput: boolean,
  sessionId: string
): Promise<{ text: string; audioDataUri?: string }> {
    const functionName = 'chat';
    const detectedLang = await detectLanguage(newUserMessage);

    const logPayload: any = {
      history: history.map(h => h.content),
      isVoiceInput
    };
    if (isVoiceInput) logPayload.InputAudio = newUserMessage;
    else logPayload.input_newUserMessage = newUserMessage;
    await logTrace(functionName, logPayload, sessionId, detectedLang);

    try {
        const knowledgeContext = await retrieveKnowledge(newUserMessage);
        logTrace(functionName, { retrieved_knowledge_length: knowledgeContext.length }, sessionId, detectedLang);

        const systemPrompt = getSystemPrompt(knowledgeContext, detectedLang);
        
        await logTrace(functionName, { system_prompt_length: systemPrompt.length }, sessionId, detectedLang);

        const chatHistory = history
          .map(item => ({
            role: item.role === 'assistant' ? 'model' : 'user',
            content: [{ text: item.content }]
        }));

        await logTrace(functionName, { status: 'calling_ai_generate' }, sessionId, detectedLang);
        
        const response = await ai.generate({
            model: googleAI.model('gemini-1.5-flash-latest'),
            history: chatHistory,
            prompt: newUserMessage,
            system: systemPrompt,
        });

        const responseText = response.text;
        await logTrace(functionName, { output_ai_response: responseText }, sessionId, detectedLang);

        if (isVoiceInput) {
            const { media: audioDataUri } = await textToSpeech(responseText, sessionId, detectedLang);
            return { text: responseText, audioDataUri };
        }

        return { text: responseText };

    } catch (error) {
        const errorMessage = error instanceof Error ? `Sorry, there was a problem: ${error.message}` : "Sorry, I couldn't connect to the assistant at this time. Please try again later.";
        await logTrace(functionName, { output_error: errorMessage }, sessionId, detectedLang);
        return { text: errorMessage };
    }
}

export async function handleFileUpload(fileDataUri: string, fileName: string, sessionId: string): Promise<{ text: string }> {
    const functionName = 'handleFileUpload';
    await logTrace(functionName, { input_fileName: fileName }, sessionId);
    try {
        const processingResult = await processDocument({ fileDataUri, fileName, sessionId });
        await logTrace(functionName, { document_summary: processingResult.summary }, sessionId);

        const confirmationText = `Hemos recibido y procesado tu documento "${fileName}". Nuestro equipo lo revisará y se pondrá en contacto contigo a la brevedad. Gracias por tu interés.`;
        return { text: confirmationText };

    } catch (error) {
        const errorMessage = error instanceof Error ? `Error procesando el archivo: ${error.message}` : "Lo siento, ha ocurrido un error inesperado al procesar el archivo.";
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
      languageCode: z.string().optional(),
    }),
    outputSchema: z.object({
        media: z.string().describe("The base64 encoded WAV audio data URI."),
    }),
  },
  async ({ text, sessionId, languageCode }) => {
    if (!text) return { media: '' };
    await logTrace('textToSpeech', { input_text: text }, sessionId, languageCode);
    
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

export async function textToSpeech(text: string, sessionId?: string, languageCode?: string): Promise<{ media: string }> {
    return ttsFlow({ text, sessionId, languageCode });
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
        await logTrace('speechToText_end', { output_transcribed_text: transcribedText }, sessionId);
        return { text: transcribedText };
    }
);

export async function speechToText(audioDataUri: string, sessionId: string): Promise<{ text: string }> {
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
