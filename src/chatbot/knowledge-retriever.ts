
import { promises as fs } from 'fs';
import path from 'path';
import { Document } from "@langchain/core/documents";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

let vectorStore: MemoryVectorStore | null = null;

const KNOWLEDGE_BASE_DIR = 'src/chatbot/IAsourcesPrompt';
const KNOWLEDGE_FILES = [
  '1.1-Servicios-Generales.txt',
  '1.2-Servicios-Detalle.txt',
  '1.3-Servicios-Oracle.txt',
  '2.1-SobreNosotros-QuienesSomos.txt',
  '2.2-SobreNosotros-Contacto.txt',
  '3.1-Forex-MercadoDeDivisas.txt',
  '3.2-Estrategia-Inversion.txt',
  '3.3-OpcionesVanilla-Conceptos.txt',
  '4.1-Smartmoney-QueEs.txt',
  '5.1-CarryTrade-QueEs.txt',
  '5.2-CarryTrade-Peligros.txt',
  '5.2-Frameworks-General.txt',
  '6.1-Crypto-Defi.txt'
];

async function initializeVectorStore() {
  if (vectorStore) {
    return;
  }

  try {
    const documents: Document[] = [];
    for (const file of KNOWLEDGE_FILES) {
      const filePath = path.join(process.cwd(), KNOWLEDGE_BASE_DIR, file);
      try {
        await fs.access(filePath); // Check if file exists
        const loader = new TextLoader(filePath);
        const docs = await loader.load();
        documents.push(...docs);
      } catch (e) {
        console.warn(`Knowledge file not found, skipping: ${filePath}`);
      }
    }

    if (documents.length === 0) {
      console.warn("No knowledge documents were loaded. The chatbot may not have any information to provide.");
      // Create a dummy vector store to avoid crashing
      vectorStore = new MemoryVectorStore(new GoogleGenerativeAIEmbeddings());
      return;
    }

    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "embedding-001",
        taskType: "RETRIEVAL_DOCUMENT"
    });
    
    vectorStore = await MemoryVectorStore.fromDocuments(documents, embeddings);
    console.log("Vector store initialized successfully.");

  } catch (error) {
    console.error("Failed to initialize vector store:", error);
    // Create a dummy store on error to allow the app to run
    vectorStore = new MemoryVectorStore(new GoogleGenerativeAIEmbeddings());
  }
}

// Immediately start initialization
initializeVectorStore();

export async function retrieve(query: string): Promise<string> {
  if (!vectorStore) {
    console.warn("Vector store not initialized. Returning empty knowledge.");
    return "No knowledge base available.";
  }

  try {
    const results = await vectorStore.similaritySearch(query, 4);
    if (results.length === 0) {
      return "No relevant information found in the knowledge base.";
    }
    return results.map(result => result.pageContent).join('\n---\n');
  } catch (error) {
    console.error("Error during knowledge retrieval:", error);
    return "There was an error retrieving information.";
  }
}
