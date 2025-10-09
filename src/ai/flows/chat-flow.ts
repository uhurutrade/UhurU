
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
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";


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

  // The model's response metadata might contain the detected language.
  // This depends on the specific model and LangChain integration.
  // For Gemini, we rely on the prompt to enforce language, so we'll pass back
  // the language that was used for the prompt, or the newly detected one.
  
  // We need to determine the final language code.
  // Let's assume the model itself doesn't explicitly return a language code in the response object.
  // The most reliable way is to make a separate call to a detection model or
  // rely on the fact that our prompt engineering forces a language.
  
  let finalLanguageCode = languageCode;

  // If languageCode was not initially provided, the model was instructed to auto-detect.
  // We can't be 100% sure what it detected without another call.
  // A simple heuristic: if the user's prompt was simple (e.g. "ciao"), 
  // and the response is long, we can try to detect the language of the response.
  // However, for now, we'll trust the model's adherence to the system prompt.
  // A better approach is to ask the model to include the language code in its response.

  // Let's refine the logic: the response from the model _should_ be in the correct language.
  // We can't reliably detect it here without another API call.
  // The `chat` function in LangChain doesn't easily expose the detected language.
  
  // The most robust fix is to adjust the prompt to ask the model to state the language.
  // But let's try a simpler fix first: if a language code was provided, we assume it was used.
  // If not, we can't be sure. Let's make a small call to detect the language of the RESPONSE.

  const detectionModel = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
      maxOutputTokens: 10,
      temperature: 0,
  });

  const detectionPrompt = `Identify the BCP-47 language code for the following text. Respond with ONLY the language code (e.g., "en", "es", "it"). Text: "${content}"`;
  const detectionResult = await detectionModel.invoke([new HumanMessage(detectionPrompt)]);
  const detectedCode = detectionResult.content.toString().trim().toLowerCase();

  // Basic validation to ensure it's a plausible language code (2-3 letters)
  if (/^[a-z]{2,3}$/.test(detectedCode)) {
      finalLanguageCode = detectedCode;
  } else if (!finalLanguageCode) {
      // Fallback if detection fails and we didn't have a code to begin with
      finalLanguageCode = 'en';
  }


  return {
    content: content || 'No response',
    languageCode: finalLanguageCode,
  };
}
