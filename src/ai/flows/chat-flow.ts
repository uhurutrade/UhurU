
'use server';

import OpenAI from 'openai';
import { promises as fs } from 'fs';
import path from 'path';

// This function reads the company info file. It's defined outside the chat function
// so the file is read only once when the server starts, improving performance.
const companyInfoPromise = fs.readFile(path.join(process.cwd(), 'src', 'data', 'company-info.md'), 'utf-8')
  .catch(error => {
    console.error('Error reading company info file:', error);
    // Return a default fallback message if the file is missing or unreadable
    return 'No company information available at the moment.';
  });


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export type ChatInput = {
  history: {
    role: 'user' | 'model';
    content: string;
  }[];
};

export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  // Wait for the company info to be loaded
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

  // The last message is the new user prompt.
  const lastUserMessage = input.history.at(-1);
  // The rest of the history is the conversation context.
  // We slice off the original "Hello" from the assistant.
  const conversationHistory = input.history.slice(1, -1);

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory.map(msg => ({
      role: msg.role === 'model' ? 'assistant' : 'user',
      content: msg.content,
    })),
  ];

  if (lastUserMessage) {
    messages.push({ role: 'user', content: lastUserMessage.content });
  }

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages,
    });
    return response.choices[0].message.content ?? "I'm sorry, I'm having trouble responding right now. Please try again later.";
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return "I'm sorry, an error occurred while connecting to the AI service. Please check the server logs for more details.";
  }
}
