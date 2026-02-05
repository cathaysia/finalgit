import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppStore } from '@/hooks/use-store';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export function OpenAi() {
  const t = useTranslations();
  const [aiConfig, setOpenAiKey, setOpenAiEndpoint, setOpenAiModel] =
    useAppStore(s => [
      s.aiConfig,
      s.setOpenAiKey,
      s.setOpenAiEndpoint,
      s.setOpenAiModel,
    ]);
  const [isTesting, setIsTesting] = useState(false);
  const [testMessage, setTestMessage] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<'success' | 'error' | null>(
    null,
  );

  const modelsUrl = buildModelsUrl(aiConfig.openai.endpoint);
  const testConnection = async () => {
    if (!modelsUrl) {
      setTestStatus('error');
      setTestMessage(t('openai.invalid_endpoint'));
      return;
    }
    setIsTesting(true);
    setTestMessage(null);
    setTestStatus(null);
    try {
      const res = await fetch(modelsUrl, {
        headers: {
          Authorization: `Bearer ${aiConfig.openai.key}`,
        },
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      setTestStatus('success');
      setTestMessage(t('openai.test_success'));
    } catch (error) {
      setTestStatus('error');
      setTestMessage(
        t('openai.test_failed', {
          error: error instanceof Error ? error.message : 'Unknown error',
        }),
      );
    } finally {
      setIsTesting(false);
    }
  };

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
        <Button variant="outline" onClick={testConnection} disabled={isTesting}>
          {t('openai.test')}
        </Button>
        {testMessage && (
          <div
            className={`flex items-start gap-2 rounded-md border px-3 py-2 text-xs ${
              testStatus === 'success'
                ? 'border-green-500/30 border-l-4 border-l-green-500 bg-green-500/10 text-green-700'
                : 'border-red-500/30 border-l-4 border-l-red-500 bg-red-500/10 text-red-600'
            }`}
          >
            {testStatus === 'success' ? (
              <FaCheckCircle className="mt-0.5 h-3.5 w-3.5" />
            ) : (
              <FaExclamationTriangle className="mt-0.5 h-3.5 w-3.5" />
            )}
            <span>{testMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function buildModelsUrl(endpoint: string) {
  const trimmed = endpoint.trim().replace(/\/+$/, '');
  if (!trimmed) {
    return null;
  }
  if (trimmed.endsWith('/v1')) {
    return `${trimmed}/models`;
  }
  return `${trimmed}/v1/models`;
}
