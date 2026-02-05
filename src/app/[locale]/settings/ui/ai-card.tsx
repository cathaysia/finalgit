import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/hooks/use-store';
import { AiKind } from '@/lib/ai';
import { useTranslations } from 'next-intl';
import { OpenAi } from './ai-card/openai';
import { OpenAiCompatible } from './ai-card/openai-compatible';

export default function AiCard() {
  const t = useTranslations();
  const [aiConfig, setCurrentAi] = useAppStore(s => [
    s.aiConfig,
    s.setCurrentAi,
  ]);
  const modelLabel =
    aiConfig.current === AiKind.OpenAi
      ? aiConfig.openai.model
      : aiConfig.openAiCompatible.model;

  return (
    <div className="w-full border-border/60 bg-background/80 shadow-sm backdrop-blur dark:bg-background/60">
      <a>{t('profile.ai_provider')}</a>
      <div>
        <Select
          value={aiConfig.current}
          onValueChange={val => {
            if (val === AiKind.OpenAi || val === AiKind.OpenAiCompatible) {
              setCurrentAi(val);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={modelLabel} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AiKind.OpenAi}>OpenAi</SelectItem>
            <SelectItem value={AiKind.OpenAiCompatible}>
              OpenAi Compatible
            </SelectItem>
          </SelectContent>
        </Select>
        {aiConfig.current === AiKind.OpenAi && <OpenAi />}
        {aiConfig.current === AiKind.OpenAiCompatible && <OpenAiCompatible />}
      </div>
    </div>
  );
}
