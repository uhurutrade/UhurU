'use server';
/**
 * @fileOverview A specific chat flow for the RAG UCM page that interacts with an n8n webhook.
 */

import { z } from 'zod';
import {
  HistoryItem,
  HistoryItemSchema,
} from '../types';

const RagUcmChatRequestSchema = z.object({
  history: z.array(HistoryItemSchema),
  prompt: z.string(),
  sessionId: z.string().optional(),
});
export type RagUcmChatRequest = z.infer<typeof RagUcmChatRequestSchema>;

const RagUcmChatResponseSchema = z.object({
  content: z.string(),
});
export type RagUcmChatResponse = z.infer<typeof RagUcmChatResponseSchema>;


export async function ragUcmChat(request: RagUcmChatRequest): Promise<RagUcmChatResponse> {
  const { history, prompt, sessionId } = request;
  const webhookUrl = 'https://n8n.uhurutrade.com/webhook/af8f1b3d-f2fb-47ee-8058-3bf09136bc16';

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        history,
        sessionId,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('n8n webhook error:', errorBody);
      throw new Error(`The webhook responded with status: ${response.status}.`);
    }

    const responseData = await response.json();

    // Assuming n8n returns a JSON object with a "content" field.
    // If your n8n workflow returns a different structure, you might need to adjust this.
    if (typeof responseData.content !== 'string') {
        throw new Error('The webhook response did not contain a valid "content" field.');
    }
    
    return {
      content: responseData.content,
    };

  } catch (error) {
    console.error('Failed to call n8n webhook:', error);
    if (error instanceof Error) {
        return { content: `I'm sorry, I couldn't connect to the n8n service. Error: ${error.message}` };
    }
    return { content: "I'm sorry, an unknown error occurred while trying to connect to the n8n service." };
  }
}
