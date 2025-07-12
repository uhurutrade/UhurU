'use server';
/**
 * @fileOverview A conversational chat AI flow using Genkit.
 *
 * - chat - A function that handles the chat conversation process.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { promises as fs } from 'fs';
import path from 'path';
import { ai } from '@/ai/instance';
import { z } from 'zod';

const companyInfoPromise = fs.readFile(path.join(process.cwd(), 'src', 'data', 'company-info.md'), 'utf-8')
  .catch(error => {
    console.error('Error reading company info file:', error);
    return 'No company information available at the moment.';
  });

const HistoryItemSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(HistoryItemSchema),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;
export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  const { text } = await chatFlow(input);
  return text;
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: z.string(),
  },
  async (input) => {
    const companyInfo = await companyInfoPromise;

    const systemPrompt = `You are a friendly and professional AI assistant for UhurU Trade Ltd, a technology and finance consulting company. Your name is "UhurU AI Assistant".
Your goal is to answer user questions based *only* on the information provided below.
You must answer in the same language the user is asking (either English or Spanish). Be concise and helpful.

The user will start by choosing a language. Respond to their choice in the chosen language.

If the user asks something you cannot answer with the provided information, politely say "I can only provide information about UhurU's services and company details. Is there anything specific about UhurU I can help you with?" or in Spanish "Solo puedo proporcionar información sobre los servicios y detalles de la empresa UhurU. ¿Hay algo específico sobre UhurU en lo que pueda ayudarte?". Do not make up information.

---
COMPANY AND SERVICES INFORMATION:
${companyInfo}
---
`;

    const model = ai.model('gemini-1.5-flash-latest');
    
    const response = await ai.generate({
      model: model,
      prompt: input.history.at(-1)?.content ?? '',
      history: input.history.slice(0, -1),
      config: {
        systemPrompt: systemPrompt,
      },
    });

    return response.text;
  }
);
