
/**
 * @fileoverview This file initializes the Genkit AI instance.
 * It aconfigures Genkit to use Google AI for generative AI tasks.
 */
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  logLevel: 'debug',
  enableTracing: true,
});
