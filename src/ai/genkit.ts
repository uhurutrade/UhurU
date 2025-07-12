/**
 * @fileoverview This file initializes and aiconfigures the Genkit AI framework.
 */
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { configureGenkit } from 'genkit';

// Note: The Firebase plugin is not used in this project's configuration.
// import {firebase} from '@genkit-ai/firebase';

if (!process.env.GOOGLE_API_KEY) {
  throw new Error(
    'The GOOGLE_API_KEY environment variable is not set. Please add it to your .env file and restart the server.'
  );
}

configureGenkit({
  plugins: [
    googleAI({
      apiKey: process.env.GOOGLE_API_KEY,
    }),
  ],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

export const ai = genkit;
