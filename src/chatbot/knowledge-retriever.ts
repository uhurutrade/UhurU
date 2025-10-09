
'use server';

import * as fs from 'fs/promises';
import * as path from 'path';
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { Document } from 'langchain/document';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src', 'chatbot', 'IAsourcesPrompt');

// Singleton pattern to ensure the vector store is initialized only once.
let vectorStore: MemoryVectorStore | null = null;

const getVectorStore = async (): Promise<MemoryVectorStore> => {
    if (vectorStore) {
        return vectorStore;
    }

    console.log("Initializing vector store for the first time...");

    // 1. Initialize the embedding model from Google, passing the API key explicitly.
    const embeddings = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY, // Pass the API key from environment variables
        model: "text-embedding-004", // A powerful and efficient model
    });

    // 2. Read all .txt files from the knowledge directory
    const files = await fs.readdir(KNOWLEDGE_DIR);
    const txtFiles = files.filter(file => file.endsWith('.txt'));

    const documents: Document[] = [];
    for (const file of txtFiles) {
        const filePath = path.join(KNOWLEDGE_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        documents.push(new Document({
            pageContent: content,
            metadata: { source: file },
        }));
    }

    // 3. Initialize a text splitter to break down large documents
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000, // Max size of each text chunk
        chunkOverlap: 100,  // Overlap to preserve context between chunks
    });

    // 4. Split the documents into smaller chunks
    const splitDocs = await textSplitter.splitDocuments(documents);

    // 5. Create the in-memory vector store from the documents and embeddings
    vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
    
    console.log(`Vector store initialized with ${splitDocs.length} document chunks.`);
    return vectorStore;
};

export async function retrieveKnowledge(query: string, topK = 5): Promise<string> {
    const store = await getVectorStore();

    // 6. Perform a similarity search to find relevant documents
    const results = await store.similaritySearch(query, topK);

    // 7. Format the results into a single context string
    return results.map(doc => `Source: ${doc.metadata.source}\nContent: ${doc.pageContent}`).join('\n\n---\n\n');
}

