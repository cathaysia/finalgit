import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppStore } from '@/hooks/use-store';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export function OpenAiCompatible() {
  const t = useTranslations();
  const [
    aiConfig,
    setOpenAiKey,
    setOpenAiEndpoint,
    setOpenAiModel,
    setOpenAiName,
    setModelSource,
  ] = useAppStore(s => [
    s.aiConfig,
    s.setOpenAiCompatibleKey,
    s.setOpenAiCompatibleEndpoint,
    s.setOpenAiCompatibleModel,
    s.setOpenAiCompatibleName,
    s.setOpenAiCompatibleModelSource,
  ]);
  const modelSource = aiConfig.openAiCompatible.modelSource ?? 'remote';
  const [models, setModels] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [testMessage, setTestMessage] = useState<string | null>(null);
  const [testStatus, setTestStatus] = useState<'success' | 'error' | null>(
    null,
  );
  const modelsUrl = useMemo(
    () => buildModelsUrl(aiConfig.openAiCompatible.endpoint),
    [aiConfig.openAiCompatible.endpoint],
  );
  useEffect(()=>{
    if (models.length !== 0 && aiConfig.openAiCompatible.model === '') {
        setOpenAiModel(models[0]);
    }
  }, [models]);

  const fetchModels = async () => {
    if (!modelsUrl) {
      setModels([]);
      setLoadError(null);
      return;
    }
    setIsLoading(true);
    setLoadError(null);
    try {
      const res = await fetch(modelsUrl, {
        headers: aiConfig.openAiCompatible.key
          ? { Authorization: `Bearer ${aiConfig.openAiCompatible.key}` }
          : undefined,
      });
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`);
      }
      const data = (await res.json()) as { data?: { id?: string }[] };
      const items =
        data.data?.map(item => item.id).filter((id): id is string => !!id) ??
        [];
      setModels(items);
      if (
        modelSource === 'remote' &&
        items.length > 0 &&
        !aiConfig.openAiCompatible.model
      ) {
        setOpenAiModel(items[0]);
      }
    } catch (error) {
      setModels([]);
      setLoadError(error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const testConnection = async () => {
    if (!modelsUrl) {
      setTestStatus('error');
      setTestMessage(t('openai.invalid_endpoint'));
      return;
    }
    setIsLoading(true);
    setTestMessage(null);
    setTestStatus(null);
    try {
      const res = await fetch(modelsUrl, {
        headers: aiConfig.openAiCompatible.key
          ? { Authorization: `Bearer ${aiConfig.openAiCompatible.key}` }
          : undefined,
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
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchModels();
  }, [modelsUrl, aiConfig.openAiCompatible.key, modelSource]);

  useEffect(() => {
    if (!aiConfig.openAiCompatible.modelSource) {
      setModelSource('remote');
    }
  }, [aiConfig.openAiCompatible.modelSource, setModelSource]);

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
          <Label htmlFor="openai.model_source">
            {t('openai.model_source')}
          </Label>
          <Tabs
            value={modelSource}
            onValueChange={value => {
              if (value === 'remote' || value === 'custom') {
                setModelSource(value);
              }
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="remote">
                {t('openai.model_source_remote')}
              </TabsTrigger>
              <TabsTrigger value="custom">
                {t('openai.model_source_custom')}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {modelSource === 'remote' ? (
          <div className="flex flex-col gap-2">
            <Label htmlFor="openai.model">{t('openai.model')}</Label>
            <Select
              value={aiConfig.openAiCompatible.model}
              onValueChange={value => {
                setOpenAiModel(value);
              }}
              disabled={models.length === 0}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    isLoading ? t('openai.model_loading') : t('openai.model')
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {models.map(model => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {loadError && (
              <span className="text-red-500 text-xs">{loadError}</span>
            )}
          </div>
        ) : (
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
        )}
        <Button variant="outline" onClick={testConnection} disabled={isLoading}>
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
