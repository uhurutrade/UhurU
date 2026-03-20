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

    // Even more robust source replacement logic
    const processSource = (source: any, sourceId?: string) => {
      // IDs can be in various fields depending on n8n version and database
      const id = sourceId || source.id || source.document_id || (typeof source === 'string' ? source : null);
      
      // Try to find a name/filename in many possible locations
      let name = source.name || 
                 source.filename || 
                 source.metadata?.name || 
                 source.metadata?.filename || 
                 source.metadata?.title || 
                 source.metadata?.["file_name"] ||
                 source.metadata?.source ||
                 source.metadata?.metadata?.filename;
      
      if (id && name) {
        const idStr = String(id);
        const cleanName = String(name).replace(/\.[^/.]+$/, "");
        
        if (idStr.length > 5) {
           content = content.split(idStr).join(cleanName);
        }
      }
    };

    if (Array.isArray(responseData.sources)) {
      responseData.sources.forEach(s => processSource(s));
    } else if (responseData.sources && typeof responseData.sources === 'object') {
      // Handle case where sources is an object with IDs as keys
      Object.entries(responseData.sources).forEach(([id, source]) => processSource(source, id));
    }

    // Secondary pass for metadata.sources
    const metaSources = responseData.metadata?.sources;
    if (Array.isArray(metaSources)) {
      metaSources.forEach(s => processSource(s));
    } else if (metaSources && typeof metaSources === 'object') {
      Object.entries(metaSources).forEach(([id, source]) => processSource(source, id));
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
