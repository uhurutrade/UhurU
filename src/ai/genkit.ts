import { genkit, configureGenkit } from 'genkit';
import { googleAI } from 'genkit-plugin-googleai';

configureGenkit({
  plugins: [
    googleAI({
      // Specify the API version.
      apiVersion: 'v1beta',
    }),
  ],
  // Log developer-friendly errors to the console.
  logLevel: 'debug',
  // Perform OpenTelemetry instrumentation and enable exporting.
  enableTracingAndMetrics: true,
});
