
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
import fs from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';
import { callHuggingFace } from '../huggingface-client';

const logFilePath = path.join(process.cwd(), 'src', 'chatbot', 'chatbot.log');

const languageCodeMap: { [key: string]: string } = {
    'en': 'English', 'es': 'Spanish', 'fr': 'French', 'de': 'German', 'it': 'Italian',
    'pt': 'Portuguese', 'ru': 'Russian', 'zh': 'Chinese', 'ja': 'Japanese', 'ar': 'Arabic',
    'hi': 'Hindi', 'bn': 'Bengali', 'pa': 'Punjabi', 'jv': 'Javanese', 'ko': 'Korean',
    'vi': 'Vietnamese', 'te': 'Telugu', 'mr': 'Marathi', 'tr': 'Turkish', 'ta': 'Tamil',
    'ur': 'Urdu', 'gu': 'Gujarati', 'pl': 'Polish', 'uk': 'Ukrainian', 'nl': 'Dutch',
    'ms': 'Malay', 'sv': 'Swedish', 'fi': 'Finnish', 'no': 'Norwegian', 'da': 'Danish',
    'el': 'Greek', 'he': 'Hebrew', 'id': 'Indonesian', 'th': 'Thai', 'cs': 'Czech',
    'hu': 'Hungarian', 'ro': 'Romanian', 'sk': 'Slovak', 'bg': 'Bulgarian'
};


// Re-using the same logger function from chat-flow
async function logTrace(functionName: string, data: any, sessionId?: string, languageCode?: string) {
    if (process.env.TRACE === 'ON') {
        try {
            const now = new Date();
            const pad = (num: number) => num.toString().padStart(2, '0');
            const timestamp = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            
            const headerList = headers();
            const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];

            let country = 'N/A';
            try {
                // GeoIP lookup can be latency-intensive, consider disabling if not critical.
                // const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
                // if (geoResponse.ok) {
                //     const geoData = await geoResponse.json();
                //     country = geoData.countryCode || 'N/A';
                // }
            } catch (geoError) {
                console.error('IP Geolocation failed:', geoError);
            }
            
            const idPart = sessionId ? `[id:${sessionId}]` : '';
            const languageName = languageCode ? languageCodeMap[languageCode.toLowerCase()] || languageCode : '';
            const langPart = languageName ? `[language:${languageName}]` : '';
            const countryPart = `[country:${country}]`;
            const ipPart = `[ip:${ip}]`;

            const logMessage = `[${timestamp}]${idPart}${langPart}${countryPart}${ipPart} uhurulog_${functionName}: ${JSON.stringify(data)}\n`;

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


async function fileProcessingFlow(input: DocumentInput): Promise<DocumentOutput> {
    const functionName = 'fileProcessingFlow';
    await logTrace(functionName, { status: 'started', fileName: input.fileName }, input.sessionId);

    // This flow now only conceptualizes what would happen.
    // The Gemini-specific multimodal text extraction is removed.
    // A real implementation would require a dedicated document text extraction service (e.g., via a library like pdf-parse or a cloud service).
    
    // Step 1: Simulate text extraction
    const extractedText = `(Simulated extracted text for ${input.fileName}. A real implementation would use a document parsing library.)`;
    
    // Step 2: Log the "extracted" content
    await logTrace(functionName, {
      fileName: input.fileName,
      status: 'logging_full_content',
      document_full_text: extractedText,
    }, input.sessionId);

    // Step 3: Generate a summary using the extracted text.
    const summaryPrompt = `
      You are an AI assistant tasked with analyzing a document provided by a user for a project evaluation.
      The document name is "${input.fileName}".
      The full text content of the document is provided below.

      Your tasks are:
      1. Generate a comprehensive and detailed summary of the document. The summary should be several paragraphs long, highlighting key points, objectives, technologies involved, and any specific requests mentioned by the user.

      DOCUMENT CONTENT:
      ${extractedText}
    `;

    const summary = await callHuggingFace(summaryPrompt);

    if (!summary) {
        throw new Error("Could not generate a summary for the document.");
    }
    
    await logTrace(functionName, { status: 'finished', document_summary: summary }, input.sessionId);

    return {
        summary: summary,
        extractedText: extractedText,
    };
}


export async function processDocument(input: DocumentInput): Promise<DocumentOutput> {
  return fileProcessingFlow(input);
}
