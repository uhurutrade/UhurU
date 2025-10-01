import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import fs from 'fs/promises';
import path from 'path';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// Self-invoking async function to initialize logging on application startup.
(async () => {
  const logDirectory = path.join(process.cwd(), 'src', 'chatbot');
  const logFilePath = path.join(logDirectory, 'chatbot.log');

  try {
    // Ensure the directory exists.
    await fs.mkdir(logDirectory, { recursive: true });

    // Check if the file exists. If not, create it with an initial message.
    try {
      await fs.access(logFilePath);
      console.log('chatbot.log already exists.');
    } catch (error) {
      // file does not exist, create it
      const now = new Date().toISOString();
      await fs.writeFile(logFilePath, `[${now}] Log file created.\n`);
      console.log('chatbot.log created successfully.');
    }
  } catch (error) {
    console.error('Failed to initialize chatbot logging system:', error);
  }
})();

    