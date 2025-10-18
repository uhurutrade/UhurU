'use server';

import fs from 'fs/promises';
import path from 'path';
import { headers } from 'next/headers';

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


/**
 * Logs a message to the chatbot.log file.
 * @param role The role of the message source ('user', 'assistant', 'assistant-error').
 * @param content The content of the message to log.
 * @param sessionId The user's session ID.
 */
export async function logConversation(role: 'user' | 'assistant' | 'assistant-error', content: string, sessionId?: string) {
    if (process.env.TRACE !== 'ON') {
        return;
    }
    
    try {
        const now = new Date();
        const pad = (num: number) => num.toString().padStart(2, '0');
        const timestamp = `${pad(now.getDate())}-${pad(now.getMonth() + 1)}-${now.getFullYear()} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        
        const headerList = headers();
        const ip = (headerList.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
        const languageCode = headerList.get('accept-language')?.split(',')[0].split('-')[0];

        let country = 'N/A';
        try {
            // GeoIP lookup can be latency-intensive, consider making it optional or handling timeouts.
            const geoResponse = await fetch(`http://ip-api.com/json/${ip}?fields=countryCode`);
            if (geoResponse.ok) {
                const geoData = await geoResponse.json();
                country = geoData.countryCode || 'N/A';
            }
        } catch (geoError) {
            console.error('IP Geolocation failed:', geoError);
        }
        
        const idPart = sessionId ? `[id:${sessionId}]` : '';
        const languageName = languageCode ? languageCodeMap[languageCode.toLowerCase()] || languageCode : 'N/A';
        const langPart = `[language:${languageName}]`;
        const countryPart = `[country:${country}]`;
        const ipPart = `[ip:${ip}]`;

        // Using a more structured log format
        const logData = {
            role,
            content: content.replace(/\n/g, '\\n') // Escape newlines for single-line JSON
        };

        const logMessage = `[${timestamp}]${idPart}${langPart}${countryPart}${ipPart} uhurulog_conversation: ${JSON.stringify(logData)}\n`;

        await fs.appendFile(logFilePath, logMessage);
    } catch (error) {
        console.error('Failed to write to chatbot.log', error);
    }
}
