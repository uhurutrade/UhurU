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
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";

const ChatRequestSchema = z.object({
  history: z.array(HistoryItemSchema),
  prompt: z.string(),
  sessionId: z.string().optional(),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

const ChatResponseSchema = z.object({
  content: z.string(),
});
export type ChatResponse = z.infer<typeof ChatResponseSchema>;


export async function chat(request: ChatRequest): Promise<ChatResponse> {
  const { history, prompt } = request;

  // 1. Retrieve relevant knowledge
  const knowledgeResponse = await knowledge.retrieve(prompt);
  
  // 2. Get the system prompt
  const systemPromptContent = getSystemPrompt(knowledgeResponse);
  
  // 3. Initialize the Chat Model
  const model = new ChatGoogleGenerativeAI({
      model: "gemini-1.5-flash",
      maxOutputTokens: 2048,
      temperature: 0.8,
  });
  
  // 4. Construct the full prompt template
  const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(systemPromptContent),
      new MessagesPlaceholder("chat_history"),
      new HumanMessage("{input}"),
  ]);

  // 5. Create the runnable chain
  const chain = promptTemplate.pipe(model);

  // 6. Construct the message history for the model
  const messageHistory = history.map((item) => 
      item.role === 'assistant' 
          ? new AIMessage(item.content)
          : new HumanMessage(item.content)
  );

  // 7. Invoke the chain
  const response = await chain.invoke({
      input: prompt,
      chat_history: messageHistory,
  });
  
  const responseText = response.content.toString();

  // The entire response from the model is the content.
  return {
    content: responseText,
  };
}
