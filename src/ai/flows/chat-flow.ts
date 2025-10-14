'use server';
/**
 * @fileOverview A unified chat flow that proxies requests to an n8n webhook and logs conversations.
 */

import { z } from 'zod';
import {
  HistoryItem,
  HistoryItemSchema,
} from '../types';
import { logConversation } from '@/lib/chatbot-logger';

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
  const { history, prompt, sessionId } = request;
  const webhookUrl = 'https://n8n.uhurutrade.com/webhook/0a91d540-adb7-424a-9ff1-be55ba6667d6';

  // Log the user's prompt
  await logConversation('user', prompt, sessionId);

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: prompt,
        history,
        sessionId,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      const errorMessage = `The webhook responded with status: ${response.status}.`;
      console.error('n8n webhook error:', response.status, errorBody);
      // Log the error response
      await logConversation('assistant-error', errorMessage, sessionId);
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    
    // Ensure the response from n8n has the 'content' field.
    if (typeof responseData.content !== 'string') {
        const errorMessage = 'The webhook response did not contain a valid "content" field.';
        console.error('Invalid response structure from n8n webhook:', responseData);
        await logConversation('assistant-error', errorMessage, sessionId);
        throw new Error(errorMessage);
    }
    
    // Log the assistant's response
    await logConversation('assistant', responseData.content, sessionId);
    
    return {
      content: responseData.content,
    };

  } catch (error) {
    console.error('Failed to call n8n webhook:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    // Log the catch block error
    await logConversation('assistant-error', `Failed to connect to chat service: ${errorMessage}`, sessionId);
    
    if (error instanceof Error) {
        return { content: `I'm sorry, I couldn't connect to the chat service. Error: ${error.message}` };
    }
    return { content: "I'm sorry, an unknown error occurred while trying to connect to the chat service." };
  }
}
