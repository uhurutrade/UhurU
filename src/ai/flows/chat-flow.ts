
'use server';

import type { HistoryItem } from '@/ai/types';

/**
 * Sends a user message and conversation history to a Firebase Function
 * and returns the AI's response.
 * @param newUserMessage The new message from the user.
 * @param history The previous conversation history.
 * @returns A promise that resolves to the chatbot's reply as a string.
 */
export async function chat(newUserMessage: string, history: HistoryItem[]): Promise<string> {
  // =================================================================
  // !! IMPORTANTE !!
  // Reemplaza esta URL con la URL de tu propia Firebase Function.
  // =================================================================
  const firebaseFunctionUrl = "https://europe-west1-uhuru-a35ed.cloudfunctions.net/chatUhurU"; // <-- REEMPLAZA ESTA URL

  if (firebaseFunctionUrl.includes("[") || firebaseFunctionUrl.includes("]")) {
      const errorMessage = "Error de configuración: La URL de la Firebase Function no ha sido configurada en 'src/ai/flows/chat-flow.ts'.";
      console.error(errorMessage);
      return errorMessage;
  }

  try {
    const response = await fetch(firebaseFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // El cuerpo debe coincidir con lo que espera tu Firebase Function.
      // Aquí enviamos el nuevo mensaje y el historial.
      body: JSON.stringify({
        message: newUserMessage,
        history: history 
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error from Firebase Function:', errorData);
      throw new Error(errorData.error || 'Error al conectar con el chatbot.');
    }

    const data = await response.json();
    
    // Asegúrate de que tu función devuelve un objeto con una propiedad 'reply'
    if (!data.reply) {
        throw new Error("La respuesta de la función no contenía un campo 'reply'.");
    }

    return data.reply;

  } catch (error) {
    console.error('Error calling Firebase Function:', error);
    return "Lo siento, no pude conectar con el asistente en este momento. Por favor, inténtalo más tarde.";
  }
}
