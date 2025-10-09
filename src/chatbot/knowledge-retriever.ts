
import { promises as fs } from 'fs';
import path from 'path';
import { Document } from "@langchain/core/documents";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

let vectorStore: MemoryVectorStore | null = null;

const KNOWLEDGE_BASE_DIR = 'src/chatbot/IAsourcesPrompt';

// Relevance threshold for similarity search. Values are between 0 and 1.
// A lower threshold is more lenient, a higher one is stricter.
const RELEVANCE_THRESHOLD = 0.75;

async function initializeVectorStore() {
  if (vectorStore) {
    return;
  }

  try {
    const documents: Document[] = [];
    
    // Dynamically read all .txt files from the knowledge directory
    const filesInDir = await fs.readdir(KNOWLEDGE_BASE_DIR);
    const knowledgeFiles = filesInDir.filter(file => file.endsWith('.txt'));

    for (const file of knowledgeFiles) {
      const filePath = path.join(process.cwd(), KNOWLEDGE_BASE_DIR, file);
      try {
        await fs.access(filePath); // Check if file exists
        const loader = new TextLoader(filePath);
        const docs = await loader.load();
        documents.push(...docs);
        console.log(`Loaded knowledge file: ${file}`);
      } catch (e) {
        console.warn(`Could not access or load file, skipping: ${filePath}`);
      }
    }

    if (documents.length === 0) {
      console.warn("No knowledge documents were loaded. The chatbot may not have any information to provide.");
      vectorStore = new MemoryVectorStore(new GoogleGenerativeAIEmbeddings());
      return;
    }

    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "embedding-001",
    });
    
    vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
    console.log("Vector store initialized successfully with all .txt files in the directory.");

  } catch (error) {
    console.error("Failed to initialize vector store:", error);
    vectorStore = new MemoryVectorStore(new GoogleGenerativeAIEmbeddings());
  }
}

initializeVectorStore();

export async function retrieve(query: string): Promise<string> {
  if (!vectorStore) {
    console.warn("Vector store not initialized. Returning empty knowledge.");
    return "No knowledge base available.";
  }

  try {
    // Use similaritySearchWithScore to get relevance scores.
    const resultsWithScores = await vectorStore.similaritySearchWithScore(query, 4);

    if (resultsWithScores.length === 0) {
      return "No relevant information found in the knowledge base.";
    }

    // Filter out results that are below the relevance threshold.
    const relevantResults = resultsWithScores.filter(
      ([, score]) => score >= RELEVANCE_THRESHOLD
    );
    
    if (relevantResults.length === 0) {
        // This happens for generic greetings like "hello", "hi", etc.
        // Return an empty string so the model can handle it as a general conversation.
        return "";
    }

    return relevantResults.map(([doc]) => doc.pageContent).join('\n---\n');
  } catch (error) {
    console.error("Error during knowledge retrieval:", error);
    return "There was an error retrieving information.";
  }
}
