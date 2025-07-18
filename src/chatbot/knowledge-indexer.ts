
'use server';

import { connect } from 'vectordb';
import { googleAI } from '@genkit-ai/googleai';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import * as fs from 'fs/promises';
import * as path from 'path';

// Define paths for knowledge base and vector DB
const KNOWLEDGE_DIR = path.join(process.cwd(), 'src', 'chatbot', 'IAsourcesPrompt');
const DB_PATH = path.join(process.cwd(), 'data'); 
const DB_FILE_PATH = path.join(DB_PATH, 'chatbot.lancedb');

// Initialize a text splitter for chunking documents
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000, // Max characters per chunk
  chunkOverlap: 100,  // Overlap to preserve context between chunks
});

// Use Google's embedding model via Genkit
const embeddingModel = googleAI.embedder('text-embedding-004');
const TABLE_NAME = 'knowledge';

/**
 * Indexes the knowledge base from .txt files into a LanceDB vector store.
 * This process deletes the old database and rebuilds it from scratch on each run
 * to ensure all changes (additions, modifications, deletions) are reflected.
 */
export async function indexKnowledgeBase() {
  console.log('Starting knowledge base indexing...');
  
  // Ensure the data directory exists
  await fs.mkdir(DB_PATH, { recursive: true });

  // Delete the old database to force a full re-index
  try {
    await fs.rm(DB_FILE_PATH, { recursive: true, force: true });
    console.log('Previous vector database removed for re-indexing.');
  } catch (error: any) {
    if (error.code !== 'ENOENT') { // Ignore error if file doesn't exist
      console.error('Error removing old vector database:', error);
    }
  }

  const db = await connect(DB_PATH);
  
  // Read all .txt files from the knowledge directory
  const files = await fs.readdir(KNOWLEDGE_DIR);
  const documents: { text: string; source: string }[] = [];

  for (const file of files) {
    if (file.endsWith('.txt')) {
      const content = await fs.readFile(path.join(KNOWLEDGE_DIR, file), 'utf-8');
      const chunks = await textSplitter.splitText(content);
      chunks.forEach(chunk => {
        documents.push({
          text: chunk,
          source: file, // Store the source filename as metadata
        });
      });
    }
  }

  if (documents.length === 0) {
    console.warn('No documents found to index.');
    return;
  }

  console.log(`Found ${documents.length} text chunks to index.`);
  
  // Create vector embeddings for all document chunks
  const embeddings = await embeddingModel.embed(documents.map(d => d.text));

  // Create the table and add the vectorized data
  await db.createTable(TABLE_NAME, 
    documents.map((doc, i) => ({
      vector: embeddings[i],
      text: doc.text,
      source: doc.source,
    }))
  );

  console.log(`Knowledge base indexed successfully into '${TABLE_NAME}' table.`);
}
