import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Ollama } from './ai-card/ollama';
import { OpenAi } from './ai-card/openai';
import { OpenAiCompatible } from './ai-card/openai-compatible';

export default function AiCard() {
  const t = useTranslations();
  const [aiConfig, setCurrentAi] = useAppStore(s => [
    s.aiConfig,
    s.setCurrentAi,
  ]);

  return (
    <Card className="w-full border-border/60 bg-background/80 shadow-sm backdrop-blur dark:bg-background/60">
      <CardHeader>
        <CardTitle>{t('profile.ai_provider')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          defaultValue={aiConfig.current}
          onValueChange={val => {
            if (
              val === AiKind.Ollama ||
              val === AiKind.OpenAi ||
              val === AiKind.OpenAiCompatible
            ) {
              setCurrentAi(val);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue defaultValue={aiConfig.ollama.model} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={AiKind.Ollama}>Ollama</SelectItem>
            <SelectItem value={AiKind.OpenAi}>OpenAi</SelectItem>
            <SelectItem value={AiKind.OpenAiCompatible}>
              OpenAi Compatible
            </SelectItem>
          </SelectContent>
        </Select>
        {aiConfig.current === AiKind.Ollama && <Ollama />}
        {aiConfig.current === AiKind.OpenAi && <OpenAi />}
        {aiConfig.current === AiKind.OpenAiCompatible && <OpenAiCompatible />}
      </CardContent>
    </Card>
  );
}
