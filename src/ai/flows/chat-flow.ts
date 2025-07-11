
'use server';
/**
 * @fileOverview A chatbot flow for the UhurU website.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/instance';
import { z } from 'zod';
import { promises as fs } from 'fs';
import path from 'path';

const ChatInputSchema = z.object({
  history: z.array(
    z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
    })
  ),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.string();
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

async function getCompanyInfo(): Promise<string> {
  const filePath = path.join(process.cwd(), 'src', 'data', 'company-info.md');
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error('Error reading company info file:', error);
    // Return a default fallback message if the file is missing or unreadable
    return 'No company information available at the moment.';
  }
}

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const companyInfo = await getCompanyInfo();

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
    
    // Extract the latest user message and the rest of the history
    const history = input.history.slice(0, -1);
    const lastUserMessage = input.history.at(-1)?.content || '';

    const response = await ai.generate({
      model: 'openai/gpt-3.5-turbo',
      system: systemPrompt,
      prompt: lastUserMessage,
      history: history,
    });
    
    return response.text ?? "I'm sorry, I'm having trouble responding right now. Please try again later.";
  }
);
