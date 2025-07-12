
'use server';

import type { HistoryItem } from '@/ai/types';
import { ai } from '@/ai/genkit';
import { gemini15Flash } from '@genkit-ai/googleai';
import fs from 'fs/promises';
import path from 'path';
import { companyInfo, servicesInfo } from '../../../chatbot-knowledge';

async function logTrace(functionName: string, data: any) {
    if (process.env.TRACE === 'ON') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] uhurulog_${functionName}: ${JSON.stringify(data, null, 2)}\n\n`;
        try {
            const logFilePath = path.join(process.cwd(), 'trace.log');
            await fs.appendFile(logFilePath, logMessage);
        } catch (error) {
            console.error('Failed to write to trace.log', error);
        }
    }
}

export async function chat(newUserMessage: string, history: HistoryItem[]): Promise<string> {
    const functionName = 'chat';
    await logTrace(functionName, { input_newUserMessage: newUserMessage, input_history: history });

    const chatHistory = history.map(item => ({
        role: item.role === 'assistant' ? 'model' : 'user',
        content: [{ text: item.content }]
    }));

    try {
        await logTrace(functionName, { status: 'calling_ai_generate' });
        const response = await ai.generate({
            model: gemini15Flash,
            history: chatHistory,
            prompt: newUserMessage,
            system: `You are UhurU's AI assistant. Your personality is friendly, helpful, and approachable, not overly formal or robotic. Your goal is to answer user questions about the company, its services, and how to contact them.
                - You must communicate in both English and Spanish. Detect the user's language and respond in the same language.
                - Use the provided company and services information to answer questions.
                - If you don't know the answer, say that you can't help with that and suggest they contact the company directly at hello@uhurutrade.com. In Spanish, say "No puedo ayudarte con eso, pero puedes contactar directamente a la empresa en hello@uhurutrade.com".
                - Do not answer questions that are not related to UhurU Trade Ltd.
        
                HERE IS THE COMPANY INFORMATION:
                ${companyInfo}

                HERE IS THE SERVICES INFORMATION:
                ${servicesInfo}
            `,
        });

        await logTrace(functionName, { output_ai_response: response.text });
        return response.text;

    } catch (error) {
        const errorMessage = error instanceof Error ? `Sorry, there was a problem: ${error.message}` : "Sorry, I couldn't connect to the assistant at this time. Please try again later.";
        await logTrace(functionName, { output_error: errorMessage });
        return errorMessage;
    }
}
