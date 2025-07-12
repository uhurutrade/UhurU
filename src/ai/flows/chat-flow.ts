
'use server';

import type { HistoryItem } from '@/ai/types';
import { ai } from '@/ai/genkit';
import { gemini15Flash } from '@genkit-ai/googleai';
import fs from 'fs/promises';
import path from 'path';
import { knowledgeBase } from '@/chatbot/chatbot-knowledge';
import { getSystemPrompt } from '@/chatbot/chatbot-prompt';
import { headers } from 'next/headers';

async function logTrace(functionName: string, data: any) {
    if (process.env.TRACE === 'ON') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] uhurulog_${functionName}: ${JSON.stringify(data)}\n`;
        try {
            const logFilePath = path.join(process.cwd(), 'chatbot-log.log');
            await fs.appendFile(logFilePath, logMessage);
        } catch (error) {
            console.error('Failed to write to chatbot-log.log', error);
        }
    }
}

function buildKnowledgePrompt(): string {
  let knowledgeString = '';
  for (const [key, value] of Object.entries(knowledgeBase)) {
    const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
    knowledgeString += `\n# KNOWLEDGE SECTION: ${title}\n${value}\n`;
  }
  return knowledgeString;
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

    const knowledgePrompt = buildKnowledgePrompt();
    const systemPrompt = getSystemPrompt(knowledgePrompt);

    try {
        await logTrace(functionName, { ip, status: 'calling_ai_generate' });
        const response = await ai.generate({
            model: gemini15Flash,
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
