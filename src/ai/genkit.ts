import { genkit, listModels } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import fs from 'fs/promises';
import path from 'path';

export const ai = genkit({
  plugins: [
    googleAI({apiKey: process.env.GEMINI_API_KEY}),
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

// Self-invoking async function to check API connectivity by listing models.
(async () => {
  if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set. Skipping API connectivity check.');
    return;
  }
  console.log('Attempting to check API connectivity by listing available models...');
  try {
    const models = await ai.listModels();
    console.log('Successfully connected to the API. Available models:');
    models.forEach(model => {
      console.log(`- ${model.name} (Supports: ${model.supportedGenerationMethods.join(', ')})`);
    });
  } catch (error) {
    console.error('Failed to connect to the API or list models:', error);
  }
})();
