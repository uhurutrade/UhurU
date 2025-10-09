
'use server';
/**
 * @fileOverview A simple chat flow that uses LangChain and Google's Gemini model.
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
  const { history, prompt, languageCode } = request;

  const isFirstMessage = history.length === 0;

  // 1. Retrieve relevant knowledge
  const knowledgeResponse = await knowledge.retrieve(prompt);
  
  // 2. Get the system prompt, passing the optional languageCode
  const systemPrompt = getSystemPrompt(
    knowledgeResponse,
    languageCode, // This can be undefined
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

  // 5. Invoke the model and get language from the response
  const response = await model.invoke(messages);
  
  const content = response.content.toString();

  // Try to extract language from a structured response if possible, otherwise default
  let detectedLanguage = languageCode || 'en'; // Default to 'en' if nothing else is found
  try {
    // This part is speculative. If the model can return structured data, we can use it.
    // For now, we assume the model just returns text. If the model can be instructed to return
    // { "response": "...", "language": "es" }, this would be more robust.
    // As a fallback, we just return the language code we started with, or 'en'.
  } catch (e) {
    // Parsing failed, stick with the current language or default.
  }
  
  // For now, we trust the client-side detection and the prompt to handle language.
  // We return the languageCode that was passed in, or a default if it was the first message.
  return {
    content: content || 'No response',
    languageCode: languageCode || 'en', // Pass back the used language code
  };
}
