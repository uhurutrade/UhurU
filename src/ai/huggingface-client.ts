
'use server';

// Common function to handle API requests to Hugging Face
async function queryHuggingFaceAPI(data: any, model: string): Promise<any> {
    const apiKey = process.env.HF_TOKEN;
    if (!apiKey) {
        throw new Error('Hugging Face API key (HF_TOKEN) is not configured in .env file.');
    }

    const response = await fetch(
        `https://api-inference.huggingface.co/models/${model}`,
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Hugging Face API error for model ${model}: ${response.statusText} - ${errorText}`);
        throw new Error(`Hugging Face API error: ${response.statusText}`);
    }

    return response;
}

/**
 * Calls a text generation model on Hugging Face.
 * @param prompt The full prompt to send to the model.
 * @returns The generated text.
 */
export async function callHuggingFace(prompt: string): Promise<string> {
  const model = 'mistralai/Mistral-7B-Instruct-v0.2';
  
  const response = await queryHuggingFaceAPI({
    inputs: prompt,
    parameters: {
      max_new_tokens: 1024,
      temperature: 0.7,
      return_full_text: false, // Important for instruction-tuned models
    },
  }, model);

  const result = await response.json();
  return result[0]?.generated_text || '';
}

/**
 * Calls a Speech-to-Text (ASR) model on Hugging Face.
 * @param audioBlob The audio data as a Blob.
 * @returns The transcribed text.
 */
export async function callHuggingFaceASR(audioBlob: Blob): Promise<string> {
    const model = 'openai/whisper-large-v3';
    
    const response = await queryHuggingFaceAPI(audioBlob, model);
    
    const result = await response.json();
    return result.text || '';
}

/**
 * Calls a Text-to-Speech (TTS) model on Hugging Face.
 * @param text The text to convert to speech.
 * @returns An audio Blob (e.g., in WAV format).
 */
export async function callHuggingFaceTTS(text: string): Promise<Blob> {
    const model = 'espnet/kan-bayashi_ljspeech_vits';
    
    const response = await queryHuggingFaceAPI({ inputs: text }, model);

    // TTS models return the audio data directly as a blob
    return response.blob();
}
