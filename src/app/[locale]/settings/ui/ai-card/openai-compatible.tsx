import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/use-store';
import { useTranslations } from 'next-intl';

export function OpenAiCompatible() {
  const t = useTranslations();
  const [
    aiConfig,
    setOpenAiKey,
    setOpenAiEndpoint,
    setOpenAiModel,
    setOpenAiName,
  ] = useAppStore(s => [
    s.aiConfig,
    s.setOpenAiCompatibleKey,
    s.setOpenAiCompatibleEndpoint,
    s.setOpenAiCompatibleModel,
    s.setOpenAiCompatibleName,
  ]);

  return (
    <div className="mt-2 flex flex-col gap-2">
      <Label htmlFor="openai.endpoint">{t('openai.endpoint')}</Label>
      <Input
        id="openai.endpoint"
        value={aiConfig.openAiCompatible.endpoint}
        type="url"
        placeholder="https://api.openai.com/v1"
        onChange={e => {
          setOpenAiEndpoint(e.target.value);
        }}
      />
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Label htmlFor="openai.name">Name</Label>
          <Input
            id="openai.name"
            value={aiConfig.openAiCompatible.name}
            spellCheck={false}
            onChange={e => {
              setOpenAiName(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="openai.key">{t('openai.key')}</Label>
          <Input
            id="openai_key"
            type="password"
            value={aiConfig.openAiCompatible.key}
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
              value={aiConfig.openAiCompatible.model}
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
