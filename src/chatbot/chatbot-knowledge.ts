
import fs from 'fs/promises';
import path from 'path';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src', 'chatbot', 'IAsourcesPrompt');
const FILENAME_REGEX = /^(\d+)\.(\d+)-(.+)\.txt$/;

interface KnowledgeContent {
  category: string;
  content: string;
}

// Helper to extract category name from the filename (e.g., "1.1-Servicios-Generales.txt" -> "Servicios")
function getCategoryFromFilename(filename: string): string {
    const match = filename.match(FILENAME_REGEX);
    if (!match) return 'General';
    
    // "Servicios-Generales.txt" -> "Servicios"
    const namePart = match[3]; 
    return namePart.split('-')[0].replace(/([A-Z])/g, ' $1').trim();
}

// Reads all valid .txt files from the directory and structures them.
async function getKnowledgeContent(): Promise<KnowledgeContent[]> {
  try {
    const files = await fs.readdir(KNOWLEDGE_DIR);
    const knowledgePromises = files
      .filter(file => FILENAME_REGEX.test(file))
      .map(async (file) => {
        const filePath = path.join(KNOWLEDGE_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const category = getCategoryFromFilename(file);
        return { category, content };
      });
    return Promise.all(knowledgePromises);
  } catch (error) {
    console.error("Error reading knowledge base directory:", error);
    return []; // Return empty knowledge base on error
  }
}

// Builds the final prompt string for the AI
export async function buildKnowledgePrompt(): Promise<string> {
  const allContent = await getKnowledgeContent();
  if (allContent.length === 0) return '';

  const groupedByCategory = allContent.reduce((acc, { category, content }) => {
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(content);
    return acc;
  }, {} as Record<string, string[]>);
  
  let knowledgeString = '';
  for (const [category, contents] of Object.entries(groupedByCategory)) {
    knowledgeString += `\n# KNOWLEDGE SECTION: ${category.toUpperCase()}\n`;
    knowledgeString += contents.join('\n---\n');
  }

  return knowledgeString.trim();
}
