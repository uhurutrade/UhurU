'use server';

/**
 * Función común para realizar consultas a la API de Inferencia de Hugging Face.
 * @param data Los datos a enviar.
 * @param model El nombre del modelo a consultar.
 * @returns La respuesta de la API.
 */
async function queryHuggingFaceAPI(
    data: any,
    model: string,
): Promise<Response> {
    const apiKey = process.env.HF_TOKEN;
    if (!apiKey) {
        throw new Error('La clave de API de Hugging Face (HF_TOKEN) no está configurada en el archivo .env.');
    }

    const headers: HeadersInit = {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const body: BodyInit = JSON.stringify(data);
    
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
