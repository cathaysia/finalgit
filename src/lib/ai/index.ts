import { type OpenAIProviderSettings, createOpenAI } from '@ai-sdk/openai';
import {
  type OpenAICompatibleProviderSettings,
  createOpenAICompatible,
} from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';
import { type OllamaProviderSettings, createOllama } from 'ollama-ai-provider';

export enum AiKind {
  Ollama = 'ollama',
  OpenAi = 'openai',
  OpenAiCompatible = 'openai-compatible',
}

export interface AiOllamaProps {
  kind: AiKind.Ollama;
  args?: OllamaProviderSettings;
}

export interface AiOpenAiProps {
  kind: AiKind.OpenAi;
  args?: OpenAIProviderSettings;
}

export interface AiOpenAiCompatibleProps {
  kind: AiKind.OpenAiCompatible;
  args: OpenAICompatibleProviderSettings;
}

export type AiProps = AiOllamaProps | AiOpenAiProps | AiOpenAiCompatibleProps;

function createAiProvider(props: AiProps) {
  if (props.kind === AiKind.Ollama) {
    return createOllama(props.args);
  }
  if (props.kind === AiKind.OpenAi) {
    return createOpenAI(props.args);
  }
  if (props.kind === AiKind.OpenAiCompatible) {
    return createOpenAICompatible(props.args);
  }

  return null;
}

export async function generateCommit(
  diff: string,
  aitype: AiProps,
  prompt: string,
  model: string,
  onGenerateText: (text: string, controller: AbortController) => void,
) {
  const controller = new AbortController();
  onGenerateText('', controller);
  const provider = createAiProvider(aitype);
  if (!provider) {
    return;
  }
  const { textStream } = await streamText({
    model: provider(model),
    prompt: prompt.replace('%{diff}', diff),
    abortSignal: controller.signal,
  });

  let text = '';
  for await (const textPart of textStream) {
    text += textPart;
    onGenerateText(formatGeneratedText(text), controller);
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
