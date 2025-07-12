
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

  const requestBody = {
    message: newUserMessage,
    history: history 
  };

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
      // Intenta leer el cuerpo del error como texto primero
      const errorText = await response.text();
      console.error('Error Response from Firebase Function (Text):', errorText);
      try {
        // Intenta parsear como JSON si es posible
        const errorData = JSON.parse(errorText);
        throw new Error(errorData.error || `Error del servidor: ${response.status}`);
      } catch (e) {
        // Si no es JSON, usa el texto del error
        throw new Error(errorText || `Error del servidor: ${response.status}`);
      }
    }

    const data = await response.json();
    
    // Asegúrate de que tu función devuelve un objeto con una propiedad 'reply'
    if (!data.reply) {
        console.error("Respuesta inválida de la función:", data);
        throw new Error("La respuesta de la función no contenía un campo 'reply'.");
    }

    return data.reply;

  } catch (error) {
    console.error('Error al llamar a la Firebase Function:', error);
    if (error instanceof Error) {
        return `Lo siento, hubo un problema: ${error.message}`;
    }
    return "Lo siento, no pude conectar con el asistente en este momento. Por favor, inténtalo más tarde.";
  }
}
