import { z } from 'zod';

export const HistoryItemSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});

export type HistoryItem = z.infer<typeof HistoryItemSchema>;
