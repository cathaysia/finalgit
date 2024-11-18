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
  const lines = value.text
    .split('\n')
    .map(item => item.trim())
    .filter(item => item.length !== 0);
  if (lines.length === 0) {
    return '';
  }
  let trimed = lines[0];
  if (trimed.length <= 2) {
    return trimed;
  }
  if (trimed[0] === '`' && trimed[trimed.length - 1] === '`') {
    trimed = trimed.slice(1, trimed.length - 2);
  }
  return trimed;
}

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
