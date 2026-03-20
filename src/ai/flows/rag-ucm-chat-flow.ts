'use server';
/**
 * @fileOverview A dedicated chat flow for the RAG UCM page that proxies requests to a specific n8n webhook.
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


export async function ragUcmChat(request: ChatRequest): Promise<ChatResponse> {
  const { history, prompt, sessionId } = request;
  const webhookUrl = 'https://n8n.uhurutrade.com/webhook/af8f1b3d-f2fb-47ee-8058-3bf09136bc16';

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
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    
    // Log response for debugging to see if filenames are available
    console.log('RAG UCM Response:', JSON.stringify(responseData, null, 2));
    
    // Ensure the response from n8n has the 'content' field.
    if (typeof responseData.content !== 'string') {
        const errorMessage = 'The webhook response did not contain a valid "content" field.';
        console.error('Invalid response structure from n8n webhook:', responseData);
        throw new Error(errorMessage);
    }

    let content = responseData.content;

    // More robust source replacement logic
    if (Array.isArray(responseData.sources)) {
      responseData.sources.forEach((source: any) => {
        // Try to find a name/filename in various common fields from n8n/vector stores
        let name = source.name || 
                   source.filename || 
                   source.metadata?.name || 
                   source.metadata?.filename || 
                   source.metadata?.title || 
                   source.metadata?.["file_name"];
        
        if (source.id && name) {
          // Strip extension if present (e.g., 'document.pdf' -> 'document')
          const cleanName = name.replace(/\.[^/.]+$/, "");
          // Replace all occurrences of the ID with the clean name in the content
          content = content.split(source.id).join(cleanName);
        }
      });
    }
    
    return { content };

  } catch (error) {
    console.error('Failed to call n8n webhook:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    
    if (error instanceof Error) {
        return { content: `I'm sorry, I couldn't connect to the chat service. Error: ${error.message}` };
    }
    return { content: "I'm sorry, an unknown error occurred while trying to connect to the chat service." };
  }
}
