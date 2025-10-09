
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
import { RunnableSequence } from "@langchain/core/runnables";
import { StructuredOutputParser } from "langchain/output_parsers";


const ChatRequestSchema = z.object({
  history: z.array(HistoryItemSchema),
  prompt: z.string(),
  sessionId: z.string().optional(),
  languageCode: z.string().optional(),
});
export type ChatRequest = z.infer<typeof ChatRequestSchema>;

const ChatResponseSchema = z.object({
  content: z.string(),
  languageCode: z.string().optional(),
});
export type ChatResponse = z.infer<typeof ChatResponseSchema>;

// Define the structured output Zod schema
const structuredOutputSchema = z.object({
    languageCode: z.string().length(2).describe("The BCP-47 language code of the user's prompt (e.g., 'en', 'es', 'it'). This MUST be detected from the user's input."),
    responseContent: z.string().describe("The full, final response to the user, written exclusively in the detected language."),
});
type StructuredOutputType = z.infer<typeof structuredOutputSchema>;


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

  // 4. Create a structured output parser
  const parser = StructuredOutputParser.fromZodSchema(structuredOutputSchema);
  
  // 5. Construct the full prompt template
  const promptTemplate = ChatPromptTemplate.fromMessages([
      new SystemMessage(systemPrompt),
      new MessagesPlaceholder("chat_history"),
      new HumanMessage("{input}\n\n{format_instructions}"),
  ]);

  // 6. Create the runnable chain
  const chain = RunnableSequence.from([
    promptTemplate,
    model,
    parser,
  ]);

  // 7. Construct the message history for the model
  const messageHistory = history.map((item) => 
      item.role === 'assistant' 
          ? new AIMessage(item.content)
          : new HumanMessage(item.content)
  );

  // 8. Invoke the chain
  const response: StructuredOutputType = await chain.invoke({
      input: prompt,
      chat_history: messageHistory,
      format_instructions: parser.getFormatInstructions(),
  });

  return {
    content: response.responseContent || 'No response',
    languageCode: response.languageCode || 'en',
  };
}
