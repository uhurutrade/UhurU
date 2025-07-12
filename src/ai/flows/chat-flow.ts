
'use server';

import type { HistoryItem } from '@/ai/types';
import fs from 'fs/promises';
import path from 'path';

const logFilePath = path.join(process.cwd(), 'trace.log');

async function logTrace(functionName: string, data: any) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] uhurulog_${functionName}: ${JSON.stringify(data, null, 2)}\n\n`;
  try {
    await fs.appendFile(logFilePath, logMessage);
  } catch (error) {
    console.error('Failed to write to trace.log:', error);
  }
}

/**
 * Sends a user message and conversation history to a Firebase Function
 * and returns the AI's response.
 * @param newUserMessage The new message from the user.
 * @param history The previous conversation history.
 * @returns A promise that resolves to the chatbot's reply as a string.
 */
export async function chat(newUserMessage: string, history: HistoryItem[]): Promise<string> {
  const functionName = 'chat';
  await logTrace(functionName, { input_newUserMessage: newUserMessage, input_history: history });

  // =================================================================
  // !! IMPORTANTE !!
  // Reemplaza esta URL con la URL de tu propia Firebase Function.
  // =================================================================
  const firebaseFunctionUrl = "https://europe-west1-uhuru-a35ed.cloudfunctions.net/chatUhurU"; // <-- REEMPLAZA ESTA URL

  if (firebaseFunctionUrl.includes("[") || firebaseFunctionUrl.includes("]")) {
      const errorMessage = "Error de configuración: La URL de la Firebase Function no ha sido configurada en 'src/ai/flows/chat-flow.ts'.";
      console.error(errorMessage);
      await logTrace(functionName, { output_error: errorMessage });
      return errorMessage;
  }

  const requestBody = {
    message: newUserMessage,
    history: history 
  };

  await logTrace(functionName, { sending_to_firebase: requestBody });
  console.log("Enviando a Firebase Function:", JSON.stringify(requestBody, null, 2));

  try {
    const response = await fetch(firebaseFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error Response from Firebase Function (Text):', errorText);
       await logTrace(functionName, { output_error_response_text: errorText, status: response.status });
      try {
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      } catch (e) {
        throw new Error(errorText || `Error del servidor: ${response.status}`);
      }
    }

    const data = await response.json();
    await logTrace(functionName, { received_from_firebase: data });
    
    if (!data.reply) {
        console.error("Respuesta inválida de la función:", data);
        await logTrace(functionName, { output_error: "Invalid response from function, 'reply' field missing." });
        throw new Error("La respuesta de la función no contenía un campo 'reply'.");
    }
    
    await logTrace(functionName, { output_success: data.reply });
    return data.reply;

  } catch (error) {
    console.error('Error al llamar a la Firebase Function:', error);
    const errorMessage = error instanceof Error ? `Lo siento, hubo un problema: ${error.message}` : "Lo siento, no pude conectar con el asistente en este momento. Por favor, inténtalo más tarde.";
    await logTrace(functionName, { output_final_error: errorMessage });
    return errorMessage;
  }
}
