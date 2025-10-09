
'use server';
/**
 * @fileOverview A simple chat flow that uses LangChain and Google's Gemma 2 model.
 */

import { z } from 'zod';
import {
  HistoryItem,
  HistoryItemSchema,
} from '../types';
import * as knowledge from '@/chatbot/knowledge-retriever';
import { getSystemPrompt } from '@/chatbot/chatbot-prompt';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";

const ChatRequestSchema = z.object({
  history: z.array(HistoryItemSchema),
  prompt: z.string(),
  sessionId: z.string().optional(),
  languageCode: z.string().optional(),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

const ChatResponseSchema = z.object({
  content: z.string(),
  languageCode: z.string(),
});
export type ChatResponse = z.infer<typeof ChatResponseSchema>;

export async function chat(request: ChatRequest): Promise<ChatResponse> {
  const { history, prompt, languageCode = 'en' } = request;

  const isFirstMessage = history.length === 0;

  // 1. Retrieve relevant knowledge
  const knowledgeResponse = await knowledge.retrieve(prompt);
  
  // 2. Get the system prompt
  const systemPrompt = getSystemPrompt(
    knowledgeResponse,
    languageCode,
    isFirstMessage
  );

  // 3. Initialize the Chat Model
  const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      maxOutputTokens: 2048,
      temperature: 0.8,
  });

  // 4. Construct the message history for the model
  const messages = [
    new SystemMessage(systemPrompt),
    ...history.map((item) => 
        item.role === 'assistant' 
            ? new AIMessage(item.content)
            : new HumanMessage(item.content)
    ),
    new HumanMessage(prompt),
  ];

  // 5. Invoke the model
  const response = await model.invoke(messages);
  
  const content = response.content.toString();

  return {
    content: content || 'No response',
    languageCode: languageCode,
  };
}
