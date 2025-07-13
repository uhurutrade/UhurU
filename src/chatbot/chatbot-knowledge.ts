
import fs from 'fs/promises';
import path from 'path';

const KNOWLEDGE_DIR = path.join(process.cwd(), 'src', 'chatbot', 'IAsourcesPrompt');
// This regex will capture:
// 1. The main category number (e.g., "1")
// 2. The sub-category number (e.g., "1")
// 3. The category name, which is the text between the first and second hyphens (e.g., "Servicios")
// 4. The rest of the filename, which is considered free text (e.g., "Generales")
const FILENAME_REGEX = /^(\d+)\.(\d+)-([^-]+)-(.+)\.txt$/;

interface KnowledgeContent {
  category: string;
  content: string;
}

// Helper to extract category name from the filename
function getCategoryFromFilename(filename: string): string {
    const match = filename.match(FILENAME_REGEX);
    // The category is the text between the first and second hyphens (match[3])
    if (match && match[3]) {
      // Adds a space before each uppercase letter in a camelCase string (e.g., "SobreNosotros" -> "Sobre Nosotros")
      return match[3].replace(/([A-Z])/g, ' $1').trim();
    }
    // Fallback in case the name doesn't match perfectly, though the filter should prevent this.
    return 'General';
}

// Reads all valid .txt files from the directory and structures them.
async function getKnowledgeContent(): Promise<KnowledgeContent[]> {
  try {
    const files = await fs.readdir(KNOWLEDGE_DIR);
    const knowledgePromises = files
      .filter(file => FILENAME_REGEX.test(file)) // Only process files that match the new, correct pattern
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

  // Group all content by its category
  const groupedByCategory = allContent.reduce((acc, { category, content }) => {
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(content);
    return acc;
  }, {} as Record<string, string[]>);
  
  // Build the final string, with each category as a clear section
  let knowledgeString = '';
  for (const [category, contents] of Object.entries(groupedByCategory)) {
    knowledgeString += `\n# KNOWLEDGE SECTION: ${category.toUpperCase()}\n`;
    knowledgeString += contents.join('\n---\n'); // Separate different files within the same category
  }

  return knowledgeString.trim();
}
