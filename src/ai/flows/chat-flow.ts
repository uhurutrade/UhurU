
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

// Define a simpler Zod schema for the expected JSON output
const ChatOutputSchema = z.object({
    languageCode: z.string().describe("The BCP-47 language code of the user's prompt (e.g., 'en', 'es', 'it'). This MUST be detected from the user's input."),
    responseContent: z.string().describe("The full, final response to the user, written exclusively in the detected language."),
});
type ChatOutputType = z.infer<typeof ChatOutputSchema>;

// Helper to extract JSON from a string
const extractJson = (text: string): ChatOutputType | null => {
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch || !jsonMatch[1]) {
        console.warn("Could not find JSON block in model response", text);
        return null;
    }
    try {
        const parsed = JSON.parse(jsonMatch[1]);
        const validated = ChatOutputSchema.safeParse(parsed);
        if (validated.success) {
            return validated.data;
        } else {
            console.warn("Parsed JSON does not match schema", validated.error);
            return null;
        }
    } catch (e) {
        console.error("Failed to parse JSON from model response", e);
        return null;
    }
};


export async function chat(request: ChatRequest): Promise<ChatResponse> {
  const { history, prompt, languageCode } = request;

  const isFirstMessage = history.length === 0;

  // 1. Retrieve relevant knowledge
  const knowledgeResponse = await knowledge.retrieve(prompt);
  
  // 2. Get the system prompt, passing the optional languageCode and instructions for JSON output
  const systemPromptContent = getSystemPrompt(
    knowledgeResponse,
    languageCode, // This can be undefined
    isFirstMessage
  ) + `
    You MUST wrap your final response in a JSON code block like this:
    \`\`\`json
    {
      "languageCode": "...",
      "responseContent": "..."
    }
    \`\`\`
    The 'languageCode' MUST be the BCP-47 code of the language you are responding in.
    The 'responseContent' MUST be your complete, final answer to the user in that language.
  `;
  
  // 3. Initialize the Chat Model
  const model = new ChatGoogleGenerativeAI({
      model: "gemini-2.5-flash",
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
  const structuredOutput = extractJson(responseText);

  if (structuredOutput) {
    return {
      content: structuredOutput.responseContent,
      languageCode: structuredOutput.languageCode,
    };
  }
  
  console.warn("Fallback: Could not parse structured JSON. Returning raw text.");
  // Fallback to raw text if JSON parsing fails
  return {
    content: responseText.replace(/```json\n?/, '').replace(/```\n?/, '').trim(),
    languageCode: languageCode || 'en', // Best guess
  };
}
