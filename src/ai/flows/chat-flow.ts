
'use server';

import type { HistoryItem } from '@/ai/types';
import fs from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';
import { callHuggingFace, callHuggingFaceASR, callHuggingFaceTTS, callHuggingFaceClassification } from '../huggingface-client';
import { getSystemPrompt } from '@/chatbot/chatbot-prompt';
import { processDocument } from './file-processing-flow';

const logFilePath = path.join(process.cwd(), 'src', 'chatbot', 'chatbot.log');
const knowledgeDirectory = path.join(process.cwd(), 'src', 'chatbot', 'IAsourcesPrompt');

// Expanded language map
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
                const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
                if (geoResponse.ok) {
                    const geoData = await geoResponse.json();
                    country = geoData.countryCode || 'NA';
                }
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

async function getKnowledgeContent(): Promise<string> {
    try {
        const files = await fs.readdir(knowledgeDirectory);
        const txtFiles = files.filter(file => file.endsWith('.txt'));
        
        let allContent = '';
        for (const file of txtFiles) {
            const filePath = path.join(knowledgeDirectory, file);
            const content = await fs.readFile(filePath, 'utf-8');
            allContent += `\n\n--- Start of ${file} ---\n${content}\n--- End of ${file} ---\n`;
        }
        return allContent;
    } catch (error) {
        console.error('Error reading knowledge files:', error);
        return ''; // Return empty string if there's an error
    }
}

async function detectLanguage(text: string): Promise<string> {
    try {
        // A simple heuristic to detect common non-English characters might be faster.
        // For now, we will use a small classification model, but a simpler check could work too.
        // Let's check for some common language prefixes or characteristics
        const lowerText = text.toLowerCase();
        if (lowerText.includes('hola') || lowerText.includes('gracias') || lowerText.includes('¿')) return 'es';
        if (lowerText.includes('bonjour') || lowerText.includes('merci')) return 'fr';
        // Add more simple checks as needed.
        
        // As a fallback, use a classification model, but this adds latency.
        // A more robust solution might be a dedicated library like `cld` or `langdetect`.
        // For now, this is a placeholder to avoid calling a large LLM for this task.
        const langRegex = /(es|fr|de|it|pt|ru|zh|ja|ar|hi)/;
        const match = lowerText.match(langRegex);
        if (match && languageCodeMap[match[1]]) {
            return match[1];
        }

        return 'en';
    } catch (error) {
        console.error("Language detection failed:", error);
        return 'en'; // Default to English on failure
    }
}


export async function chat(
  newUserMessage: string, 
  history: HistoryItem[],
  isVoiceInput: boolean,
  sessionId: string,
  sessionLanguage: string | null
): Promise<{ text: string; audioDataUri?: string; sessionLanguage: string; }> {
    const functionName = 'chat';
    
    let languageCode = sessionLanguage;
    let isFirstMessageInSession = false;

    if (!languageCode) {
        languageCode = await detectLanguage(newUserMessage);
        isFirstMessageInSession = true;
        logTrace(functionName, { status: `new_session_language_detected`, languageCode }, sessionId);
    } else {
        const detectedLang = await detectLanguage(newUserMessage);
        if (detectedLang !== languageCode) {
            logTrace(functionName, { status: `language_change_detected`, from: languageCode, to: detectedLang }, sessionId);
            languageCode = detectedLang;
            isFirstMessageInSession = true;
        }
    }
    
    const logPayload: any = {
      history: history.map(h => h.content),
      isVoiceInput
    };
    if (isVoiceInput) logPayload.InputAudio = newUserMessage;
    else logPayload.input_newUserMessage = newUserMessage;
    await logTrace(functionName, logPayload, sessionId, languageCode);

    try {
        const knowledgeContext = await getKnowledgeContent();
        logTrace(functionName, { knowledge_context_length: knowledgeContext.length }, sessionId, languageCode);
        
        const systemPrompt = getSystemPrompt(knowledgeContext, languageCode, isFirstMessageInSession);
        await logTrace(functionName, { system_prompt_length: systemPrompt.length }, sessionId, languageCode);
        
        // Format history for the model prompt style
        const historyForPrompt = history
          .map(item => `<|${item.role}|>\n${item.content}<|end|>`)
          .join('\n');

        // Construct the full prompt for the model in the required format
        const fullPrompt = `<|system|>\n${systemPrompt}<|end|>\n${historyForPrompt}\n<|user|>\n${newUserMessage}<|end|>\n<|assistant|>`;
        
        await logTrace(functionName, { status: 'calling_huggingface_text_generation', full_prompt_length: fullPrompt.length }, sessionId, languageCode);
        
        const responseText = await callHuggingFace(fullPrompt);

        await logTrace(functionName, { output_ai_response: responseText }, sessionId, languageCode);

        if (isVoiceInput) {
            const audioDataUri = await textToSpeech(responseText, sessionId, languageCode);
            return { text: responseText, audioDataUri, sessionLanguage: languageCode };
        }

        return { text: responseText, sessionLanguage: languageCode };

    } catch (error) {
        let errorMessage: string;
        if (error instanceof Error && (error.message.includes('503') || error.message.toLowerCase().includes('overloaded'))) {
            errorMessage = languageCode === 'es' 
                ? "Hay demasiados clientes simultáneamente, por favor espere un minuto e inténtelo de nuevo."
                : "There are too many simultaneous clients, please wait a minute and try again.";
        } else {
            errorMessage = error instanceof Error 
                ? (languageCode === 'es' ? `Lo siento, ha habido un problema: ${error.message}`: `Sorry, there was a problem: ${error.message}`)
                : (languageCode === 'es' ? "Lo siento, no he podido conectar con el asistente en este momento. Por favor, inténtelo de nuevo más tarde." : "Sorry, I couldn't connect to the assistant at this time. Please try again later.");
        }
        await logTrace(functionName, { output_error: errorMessage }, sessionId, languageCode);
        return { text: errorMessage, sessionLanguage: languageCode };
    }
}

export async function handleFileUpload(fileDataUri: string, fileName: string, sessionId: string): Promise<{ text: string }> {
    const functionName = 'handleFileUpload';
    await logTrace(functionName, { input_fileName: fileName }, sessionId);
    try {
        const processingResult = await processDocument({ fileDataUri, fileName, sessionId });
        await logTrace(functionName, { document_summary: processingResult.summary }, sessionId);

        const confirmationText = `Hemos recibido y procesado tu documento "${fileName}". Nuestro equipo lo revisará y se pondrá en contacto contigo a la brevedad. Gracias por tu interés.`;
        return { text: confirmationText };

    } catch (error) {
        const errorMessage = error instanceof Error ? `Error procesando el archivo: ${error.message}` : "Lo siento, ha ocurrido un error inesperado al procesar el archivo.";
        await logTrace(functionName, { output_error: errorMessage }, sessionId);
        return { text: errorMessage };
    }
}


export async function textToSpeech(text: string, sessionId?: string, languageCode?: string): Promise<string> {
    if (!text) return '';
    await logTrace('textToSpeech', { input_text: text }, sessionId, languageCode);
    
    // Call the Hugging Face TTS service
    const audioBlob = await callHuggingFaceTTS(text);
    const audioBuffer = Buffer.from(await audioBlob.arrayBuffer());

    // Return as a base64 data URI
    return `data:audio/wav;base64,${audioBuffer.toString('base64')}`;
}

export async function speechToText(audioDataUri: string, sessionId: string): Promise<{ text: string }> {
    await logTrace('speechToText_start', { input_audio_received: true }, sessionId);
    
    // Convert data URI to Blob for the ASR API
    const fetchResponse = await fetch(audioDataUri);
    const audioBlob = await fetchResponse.blob();

    const transcribedText = await callHuggingFaceASR(audioBlob);
    
    await logTrace('speechToText_end', { output_transcribed_text: transcribedText }, sessionId);
    return { text: transcribedText };
}
