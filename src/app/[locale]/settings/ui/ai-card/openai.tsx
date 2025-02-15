import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/use-store';
import { useTranslations } from 'next-intl';

export function OpenAi() {
  const t = useTranslations();
  const [
    aiConfig,
    setCurrentAi,
    setOllamaModel,
    setOpenAiKey,
    setOpenAiEndpoint,
    setOpenAiModel,
  ] = useAppStore(s => [
    s.aiConfig,
    s.setCurrentAi,
    s.setOllamaModel,
    s.setOpenAiKey,
    s.setOpenAiEndpoint,
    s.setOpenAiModel,
  ]);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Label htmlFor="openai.endpoint">{t('openai.endpoint')}</Label>
      <Input
        id="openai.endpoint"
        value={aiConfig.openai.endpoint}
        type="url"
        placeholder="https://api.openai.com/v1"
        onChange={e => {
          setOpenAiEndpoint(e.target.value);
        }}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="openai.key">{t('openai.key')}</Label>
          <Input
            id="openai_key"
            type="password"
            value={aiConfig.openai.key}
            onChange={e => {
              setOpenAiKey(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="openai.model">{t('openai.model')}</Label>
            <Input
              id="openai_key"
              value={aiConfig.openai.model}
              type="text"
              spellCheck={false}
              onChange={e => {
                setOpenAiModel(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
