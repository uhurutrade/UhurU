
'use server';
/**
 * @fileOverview A chat flow that proxies requests to an n8n webhook.
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

const N8N_WEBHOOK_URL = 'https://n8n.uhurutrade.com/webhook/af8f1b3d-f2fb-47ee-8058-3bf09136bc16';

export async function chat(request: ChatRequest): Promise<ChatResponse> {
  const { history, prompt, sessionId } = request;

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        history,
        prompt,
        sessionId,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('n8n webhook error response:', errorBody);
      throw new Error(`The n8n webhook responded with status: ${response.status}`);
    }

    const responseData = await response.json();

    // Assuming the n8n webhook returns a JSON object with a "content" field.
    // If your n8n workflow returns a different structure, you might need to adjust this.
    if (typeof responseData.content !== 'string') {
        console.error('Unexpected response structure from n8n webhook:', responseData);
        throw new Error('The n8n webhook returned data in an unexpected format.');
    }
    
    return {
      content: responseData.content,
    };

  } catch (error) {
    console.error('Failed to call n8n webhook:', error);
    if (error instanceof Error) {
        return { content: `Sorry, there was an issue connecting to the chat service: ${error.message}` };
    }
    return { content: 'An unexpected error occurred while trying to connect to the chat service.' };
  }
}
