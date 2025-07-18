
'use server';
/**
 * @fileOverview A flow to process uploaded documents.
 * It extracts text content from a file, logs it, and generates a summary.
 *
 * - processDocument - Handles the document processing.
 * - DocumentInput - The input type for the processDocument function.
 * - DocumentOutput - The return type for the processDocument function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { googleAI } from '@genkit-ai/googleai';
import fs from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';

const logFilePath = path.join(process.cwd(), 'src', 'chatbot', 'chatbot.log');

// Re-using the same logger function from chat-flow
async function logTrace(functionName: string, data: any, sessionId?: string) {
    if (process.env.TRACE === 'ON') {
        try {
            const now = new Date();
            const pad = (num: number) => num.toString().padStart(2, '0');
            const timestamp = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            
            const headerList = headers();
            const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
            
            const logData = { ip, ...data };
            const idPart = sessionId ? `[id:${sessionId}]` : '';
            const logMessage = `[${timestamp}]${idPart} uhurulog_${functionName}: ${JSON.stringify(logData)}\n`;

            await fs.appendFile(logFilePath, logMessage);
        } catch (error) {
            console.error('Failed to write to chatbot.log', error);
        }
    }
}


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

const documentProcessingPrompt = ai.definePrompt({
  name: 'documentProcessingPrompt',
  input: { schema: z.object({ documentText: z.string(), fileName: z.string() }) },
  output: { schema: DocumentOutputSchema },
  model: googleAI.model('gemini-1.5-flash-latest'),
  prompt: `
    You are an AI assistant tasked with analyzing a document provided by a user for a project evaluation.
    The document name is "{{fileName}}".
    The full text content of the document is provided below.

    Your tasks are:
    1.  Extract the full text content of the document.
    2.  Generate a comprehensive and detailed summary of the document. The summary should be several paragraphs long, highlighting key points, objectives, technologies involved, and any specific requests mentioned by the user.

    DOCUMENT CONTENT:
    {{{documentText}}}
  `,
});

const fileProcessingFlow = ai.defineFlow(
  {
    name: 'fileProcessingFlow',
    inputSchema: DocumentInputSchema,
    outputSchema: DocumentOutputSchema,
  },
  async (input) => {
    const functionName = 'fileProcessingFlow';
    await logTrace(functionName, { status: 'started', fileName: input.fileName }, input.sessionId);

    // Step 1: Extract text from the document using Gemini's multimodal capabilities.
    const extractionResponse = await ai.generate({
        model: googleAI.model('gemini-1.5-flash-latest'),
        prompt: [
            { text: "Extract all text content from the following document." },
            { media: { url: input.fileDataUri } },
        ],
    });

    const extractedText = extractionResponse.text;
    if (!extractedText) {
        throw new Error("Could not extract any text from the document.");
    }
    
    // Step 2: Log the full extracted content as requested.
    await logTrace(functionName, {
      fileName: input.fileName,
      status: 'logging_full_content',
      document_full_text: extractedText,
    }, input.sessionId);

    // Step 3: Generate a summary using the extracted text.
    const { output: summaryOutput } = await documentProcessingPrompt({
        documentText: extractedText,
        fileName: input.fileName,
    });

    if (!summaryOutput) {
        throw new Error("Could not generate a summary for the document.");
    }
    
    await logTrace(functionName, { status: 'finished', document_summary: summaryOutput.summary }, input.sessionId);

    // Return the full output object including summary and extracted text.
    return {
        summary: summaryOutput.summary,
        extractedText: extractedText,
    };
  }
);


export async function processDocument(input: DocumentInput): Promise<DocumentOutput> {
  return fileProcessingFlow(input);
}
