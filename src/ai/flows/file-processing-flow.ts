
'use server';
/**
 * @fileOverview A flow to process uploaded documents.
 * It extracts text content from a file, logs it, and generates a summary.
 *
 * - processDocument - Handles the document processing.
 * - DocumentInput - The input type for the processDocument function.
 * - DocumentOutput - The return type for the processDocument function.
 */

import { z } from 'zod';
import { ai } from '@/ai/genkit';
import { generate } from 'genkit';
import { logConversation } from '@/lib/chatbot-logger';


const DocumentInputSchema = z.object({
  fileDataUri: z.string().describe(
    "A file (PDF, DOCX, TXT) as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
  fileName: z.string().describe('The original name of the file.'),
  sessionId: z.string().optional().describe('The user\'s session ID for logging.'),
});
export type DocumentInput = z.infer<typeof DocumentInputSchema>;

const DocumentOutputSchema = z.object({
  summary: z.string().describe("A brief summary of the document's content."),
  extractedText: z.string().describe("The full text extracted from the document.")
});
export type DocumentOutput = z.infer<typeof DocumentOutputSchema>;


const fileProcessingFlow = ai.defineFlow(
  {
    name: 'fileProcessingFlow',
    inputSchema: DocumentInputSchema,
    outputSchema: DocumentOutputSchema,
  },
  async (input) => {
    const { fileName, sessionId, fileDataUri } = input;
    await logConversation('user', `Uploaded file: ${fileName}`, sessionId);

    // Step 1: Use Gemini to extract text from the document
    const model = ai.model('gemini-1.5-flash-latest');
    const extractionPrompt = [
        { text: `Extract all text from the following document named "${fileName}".` },
        { media: { url: fileDataUri } }
    ];

    const extractionResponse = await generate({
        model,
        prompt: extractionPrompt,
        config: { temperature: 0 },
    });

    const extractedText = extractionResponse.text;
    
    if (!extractedText) {
        await logConversation('assistant-error', 'Text extraction failed.', sessionId);
        throw new Error("Could not extract text from the document.");
    }
    
    // Step 2: Log the extracted content (logging a snippet for brevity)
    await logConversation('assistant', `Extracted text from ${fileName}: ${extractedText.substring(0, 100)}...`, sessionId);

    // Step 3: Generate a summary using the extracted text.
    const summaryPrompt = `
      You are an AI assistant tasked with analyzing a document provided by a user for a project evaluation.
      The document name is "${fileName}".
      The full text content of the document is provided below.

      Your tasks are:
      1. Generate a comprehensive and detailed summary of the document. The summary should be several paragraphs long, highlighting key points, objectives, technologies involved, and any specific requests mentioned by the user.

      DOCUMENT CONTENT:
      ${extractedText}
    `;

    const summaryResponse = await generate({
        model,
        prompt: summaryPrompt,
        config: { temperature: 0.5 }
    });

    const summary = summaryResponse.text;

    if (!summary) {
        await logConversation('assistant-error', 'Summary generation failed.', sessionId);
        throw new Error("Could not generate a summary for the document.");
    }
    
    await logConversation('assistant', `Generated summary for ${fileName}: ${summary.substring(0, 100)}...`, sessionId);

    return {
        summary: summary,
        extractedText: extractedText,
    };
  }
);


export async function processDocument(input: DocumentInput): Promise<DocumentOutput> {
  return fileProcessingFlow(input);
}
