'use server';
/**
 * @fileOverview A unified chat flow that proxies requests to an n8n webhook.
 */

import { z } from 'zod';
import {
  HistoryItem,
  HistoryItemSchema,
} from '../types';

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
      console.error('n8n webhook error:', response.status, errorBody);
      throw new Error(`The webhook responded with status: ${response.status}.`);
    }

    const responseData = await response.json();
    
    // Ensure the response from n8n has the 'content' field.
    if (typeof responseData.content !== 'string') {
        console.error('Invalid response structure from n8n webhook:', responseData);
        throw new Error('The webhook response did not contain a valid "content" field.');
    }
    
    return {
      content: responseData.content,
    };

  } catch (error) {
    console.error('Failed to call n8n webhook:', error);
    if (error instanceof Error) {
        // Return a user-friendly error message within the chat interface
        return { content: `I'm sorry, I couldn't connect to the chat service. Error: ${error.message}` };
    }
    return { content: "I'm sorry, an unknown error occurred while trying to connect to the chat service." };
  }
}
