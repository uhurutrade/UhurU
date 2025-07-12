
'use server';
/**
 * @fileOverview A conversational chat AI flow using OpenAI.
 *
 * - chat - A function that handles the chat conversation process.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */
import OpenAI from 'openai';
import { z } from 'zod';
import 'dotenv/config';

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    'The OPENAI_API_KEY environment variable is not set. Please add it to your .env file and restart the server.'
  );
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const companyInfo = `
# About UhurU Trade Ltd.

UhurU Trade Ltd. is a technology and finance consulting company. Our mission is to help businesses optimize their operations, reduce costs, and strategically plan their tax structures. We are registered in the United Kingdom, company number 15883242. Our registered office is at Unit 13 Freeland Park Wareham Road, Lytchett Matravers, BH16 6FA Poole, UK.

## Our Services

We offer a wide range of services designed to help businesses thrive in the modern digital world.

### Technology Services
- **AI Automation and AI Agents:** We deploy custom AI agents to automate marketing, invoicing, customer support, and other business processes.
- **No-Code App Development:** We build and launch Docker-portable web and mobile apps using open-source no-code solutions.
- **ERP and CRM Implementation:** We offer end-to-end ERP/CRM consulting, specializing in Oracle Financials.
- **Cloud (SaaS/PaaS) Management:** We manage and optimize your cloud deployments, focusing on cost-efficient, open-source solutions.

### Finance & Business Strategy Services
- **Amazon FBA Consulting:** We provide full-service management for your e-commerce business on Amazon, from product launch to scalable growth.
- **Blockchain and Crypto Solutions:** We offer asset tokenization services and DeFi liquidity strategies.
- **Offshore & Localization Strategies:** We help establish tax-optimized global business structures to protect assets and minimize liabilities.
- **Options and Forex Investment Training:** We provide professional training in regulated markets for secure investment strategies.

## Contact Information
- **Email:** hello@uhurutrade.com
- **Phone:** +44 7517074605
- **Website:** https://uhurutrade.com
`;

const HistoryItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

const ChatInputSchema = z.object({
  history: z.array(HistoryItemSchema),
  newUserMessage: z.string(),
});

export type ChatInput = z.infer<typeof ChatInputSchema>;
export type ChatOutput = string;

export async function chat(input: ChatInput): Promise<ChatOutput> {
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

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: systemPrompt },
    ...input.history,
    { role: 'user', content: input.newUserMessage },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      temperature: 0.7,
      max_tokens: 150,
    });
    return response.choices[0].message.content ?? "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to get response from AI service.");
  }
}

    