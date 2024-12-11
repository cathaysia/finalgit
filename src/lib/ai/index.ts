import { type OpenAIProviderSettings, createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { type OllamaProviderSettings, createOllama } from 'ollama-ai-provider';

export enum AiKind {
  Ollama = 0,
  OpenAi = 1,
}

export interface AiOllama {
  kind: AiKind.Ollama;
  args?: OllamaProviderSettings;
}

export interface AiOpenAi {
  kind: AiKind.OpenAi;
  args?: OpenAIProviderSettings;
}

export type AiType = AiOllama | AiOpenAi;

function createAi(ai: AiType) {
  if (ai.kind === AiKind.Ollama) {
    return createOllama(ai.args);
  }
  if (ai.kind === AiKind.OpenAi) {
    return createOpenAI(ai.args);
  }
}

export async function generateCommit(
  diff: string,
  aitype: AiType,
  prompt: string,
  model: string,
  onGenering: (text: string, controller: AbortController) => void,
) {
  const controller = new AbortController();
  onGenering('', controller);
  const ai = createAi(aitype);
  if (!ai) {
    return;
  }
  const llama = ai(model);
  const { textStream } = await streamText({
    model: llama,
    prompt: prompt.replace('%{diff}', diff),
    abortSignal: controller.signal,
  });

  let text = '';
  for await (const textPart of textStream) {
    text += textPart;
    onGenering(formatGeneratedText(text), controller);
    if (
      text
        .split('\n')
        .map(item => item.trim())
        .filter(item => item.length !== 0).length >= 2
    ) {
      controller.abort();
    }
  }
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

function formatGeneratedText(value: string) {
  const lines = value
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
    trimed = trimed.slice(1, trimed.length - 1);
  }
  return trimed;
}
