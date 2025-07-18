
'use server';

import * as fs from 'fs/promises';
import * as path from 'path';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src', 'chatbot', 'IAsourcesPrompt');

let knowledgeBaseCache: string | null = null;

/**
 * Reads all .txt files from the knowledge directory, concatenates their content,
 * and caches the result to avoid repeated file system access.
 * @returns A single string containing all the knowledge base content.
 */
export async function buildKnowledgePrompt(): Promise<string> {
  if (knowledgeBaseCache) {
    return knowledgeBaseCache;
  }

  try {
    const files = await fs.readdir(KNOWLEDGE_DIR);
    const txtFiles = files.filter(file => file.endsWith('.txt'));

    let combinedKnowledge = '';

    for (const file of txtFiles) {
      const filePath = path.join(KNOWLEDGE_DIR, file);
      const content = await fs.readFile(filePath, 'utf-8');
      combinedKnowledge += `\n\n---\n\n## Source: ${file}\n\n${content}`;
    }

    knowledgeBaseCache = combinedKnowledge.trim();
    return knowledgeBaseCache;
  } catch (error) {
    console.error("Error building knowledge base from files:", error);
    return "Error: Could not load knowledge base.";
  }
}
