import type { OpenAIProviderSettings } from '@ai-sdk/openai';
import { openai } from '@ai-sdk/openai';
import {
  type OpenAICompatibleProviderSettings,
  createOpenAICompatible,
} from '@ai-sdk/openai-compatible';
import { streamText } from 'ai';

export enum AiKind {
  OpenAi = 'openai',
  OpenAiCompatible = 'openai-compatible',
}

export interface AiOpenAiProps {
  kind: AiKind.OpenAi;
  args?: OpenAIProviderSettings;
}

export interface AiOpenAiCompatibleProps {
  kind: AiKind.OpenAiCompatible;
  args: OpenAICompatibleProviderSettings;
}

export type AiProps = AiOpenAiProps | AiOpenAiCompatibleProps;

function createAiProvider(props: AiProps, model: string) {
  if (props.kind === AiKind.OpenAi) {
    return openai(model);
  }
  if (props.kind === AiKind.OpenAiCompatible) {
    return createOpenAICompatible(props.args).chatModel(model);
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
  const llmModel = createAiProvider(aitype, model);
  if (!llmModel) {
    return;
  }
  const { textStream } = await streamText({
    model: llmModel,
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
