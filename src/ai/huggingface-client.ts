'use server';

/**
 * Convierte un Blob a una representación de data URL en Base64.
 * @param blob El Blob a convertir.
 * @returns Una promesa que se resuelve con el data URL en Base64.
 */
async function blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Función común para realizar consultas a la API de Inferencia de Hugging Face.
 * Maneja diferentes tipos de 'Content-Type' según la necesidad.
 * @param data Los datos a enviar.
 * @param model El nombre del modelo a consultar.
 * @param isBinaryData `true` si `data` es un Blob que debe enviarse directamente.
 * @returns La respuesta de la API.
 */
async function queryHuggingFaceAPI(
    data: any,
    model: string,
    isBinaryData = false
): Promise<Response> {
    const apiKey = process.env.HF_TOKEN;
    if (!apiKey) {
        throw new Error('La clave de API de Hugging Face (HF_TOKEN) no está configurada en el archivo .env.');
    }

    const headers: HeadersInit = {
        Authorization: `Bearer ${apiKey}`,
    };

    let body: BodyInit;

    if (isBinaryData) {
        // Para modelos de ASR (audio-a-texto), enviamos el Blob directamente.
        // fetch se encargará de establecer el 'Content-Type' correcto.
        body = data;
    } else {
        // Para modelos de texto o TTS, enviamos un JSON.
        headers['Content-Type'] = 'application/json';
        body = JSON.stringify(data);
    }

    const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
            method: 'POST',
            headers,
            body,
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error de la API de Hugging Face para el modelo ${model}: ${response.statusText} - ${errorText}`);
        throw new Error(`Error de la API de Hugging Face: ${response.statusText}`);
    }

    return response;
}

/**
 * Llama a un modelo de generación de texto en Hugging Face.
 * @param prompt El prompt completo para enviar al modelo.
 * @returns El texto generado.
 */
export async function callHuggingFace(prompt: string): Promise<string> {
    const model = 'microsoft/Phi-3-mini-4k-instruct';
  
    const response = await queryHuggingFaceAPI({
        inputs: prompt,
        parameters: {
            max_new_tokens: 1024,
            temperature: 0.7,
            return_full_text: false,
        },
    }, model);

    const result = await response.json();
    return result[0]?.generated_text || '';
}

/**
 * Llama a un modelo de clasificación simple como detección de idioma.
 * @param text El texto a clasificar.
 * @returns El resultado de la clasificación.
 */
export async function callHuggingFaceClassification(text: string): Promise<any> {
    const model = 'distilbert-base-uncased-finetuned-sst-2-english';

    const response = await queryHuggingFaceAPI({ inputs: text }, model);
    return response.json();
}

/**
 * Llama a un modelo de Audio a Texto (ASR) en Hugging Face.
 * @param audioBlob Los datos de audio como un Blob.
 * @returns El texto transcrito.
 */
export async function callHuggingFaceASR(audioBlob: Blob): Promise<string> {
    const model = 'openai/whisper-large-v3';
    
    // Enviamos el Blob directamente, que es el formato que espera el endpoint de Whisper.
    const response = await queryHuggingFaceAPI(audioBlob, model, true);
    
    const result = await response.json();
    return result.text || '';
}

/**
 * Llama a un modelo de Texto a Audio (TTS) en Hugging Face.
 * @param text El texto a convertir en audio.
 * @returns Un Blob de audio (ej., en formato WAV).
 */
export async function callHuggingFaceTTS(text: string): Promise<Blob> {
    const model = 'espnet/kan-bayashi_ljspeech_vits';
    
    // El modelo TTS espera el texto como un input en un JSON.
    const response = await queryHuggingFaceAPI({ inputs: text }, model);

    // Los modelos TTS devuelven los datos de audio directamente como un blob.
    return response.blob();
}
