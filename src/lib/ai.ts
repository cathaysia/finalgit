import { generateText } from 'ai';
import { createOllama } from 'ollama-ai-provider';

const Ollama = createOllama();

export async function generateCommit(
  diff: string,
  prompt: string,
  model: string,
) {
  const llama = Ollama(model);
  const value = await generateText({
    model: llama,
    prompt: prompt.replace('%{diff}', diff),
  });
  return value.text;
}

export namespace ollama {
  interface QueryModel {
    name: string;
    model: string;
  }

  interface QueryModelResult {
    models: QueryModel[];
  }

  export async function queryModels(api: string) {
    const res = await fetch(`${api}/api/tags`);
    const text = await res.text();
    return JSON.parse(text) as QueryModelResult;
  }
}
