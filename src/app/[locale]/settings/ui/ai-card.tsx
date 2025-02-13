import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useOllamaModels } from '@/hooks/query';
import { useAppStore } from '@/hooks/use-store';
import { fetchModel } from '@/lib/ai/ollama';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { produce } from 'immer';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { P, isMatching } from 'ts-pattern';

export default function AiCard() {
  const t = useTranslations();
  const [
    aiConfig,
    setCurrentAi,
    setOllamaModel,
    setOpenAiKey,
    setOpenAiEndpoint,
  ] = useAppStore(s => [
    s.aiConfig,
    s.setCurrentAi,
    s.setOllamaModel,
    s.setOpenAiKey,
    s.setOpenAiEndpoint,
  ]);
  const endpoint = aiConfig.ollama.endpoint;
  const [setEndpoint] = useAppStore(s => [s.setOllamaEndpoint]);

  const { error, data: models } = useOllamaModels();
  if (error) {
    NOTIFY.error(error.message);
  }
  useEffect(() => {
    if (models && aiConfig.ollama.model.length === 0 && models.length > 0) {
      setOllamaModel(models[0]);
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('profile.ai_provider')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          defaultValue={aiConfig.current}
          onValueChange={val => {
            if (val === 'ollama' || val === 'openai') {
              setCurrentAi(val);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue defaultValue={aiConfig.ollama.model} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ollama">Ollama</SelectItem>
            <SelectItem value="openai">Openai</SelectItem>
          </SelectContent>
        </Select>
        {aiConfig.current === 'ollama' && (
          <div className="mt-2 flex flex-col gap-2">
            <div>
              <Label htmlFor="ollama.endpoint">{t('ollama.endpoint')}</Label>
              <Input
                id="ollama_endpoint"
                className="mt-2"
                type="url"
                value={endpoint}
                onChange={e => {
                  setEndpoint(e.target.value);
                }}
              />
            </div>
            <OllamaPull />
          </div>
        )}
        {aiConfig.current === 'openai' && (
          <div className="mt-2 flex flex-col gap-2">
            <Label htmlFor="openai.key">{t('openai.key')}</Label>
            <Input
              id="openai_key"
              type="password"
              value={aiConfig.openai.endpoint}
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OllamaPull() {
  const t = useTranslations();
  const aiConfig = useAppStore(s => s.aiConfig);
  const endpoint = aiConfig.ollama.endpoint;
  const currentModel = aiConfig.ollama.model;
  const setCurrentModel = useAppStore(s => s.setOllamaModel);

  const [pullState, setPullState] = useState<{
    isPull: boolean;
    total: number;
    completed: number;
    state: string;
    abort: boolean;
  }>({
    isPull: false,
    total: 100,
    completed: 0,
    state: '',
    abort: false,
  });
  const [moduleName, setModuleName] = useState<string>(currentModel || '');
  const { error, data: models } = useOllamaModels();
  if (error) {
    NOTIFY.error(error.message);
  }
  if (models && !currentModel && models.length > 0) {
    setCurrentModel(models[0]);
  }
  const isDownloaded = models?.find(m => m === moduleName) !== undefined;

  useEffect(() => {
    if (!pullState.isPull) {
      return;
    }
    fetchModel(endpoint, moduleName, state => {
      let abort = false;
      setPullState(base => {
        abort = base.abort;
        return produce(base, draft => {
          if (base.abort) {
            draft.abort = false;
            draft.isPull = false;
            draft.total = 100;
            draft.completed = 0;
            return;
          }
          if (isMatching({ completed: P.select() }, state)) {
            draft.completed = state.completed;
            draft.total = state.total;
            draft.total = state.total;
            draft.completed = state.completed;
          }
          if (isMatching({ error: P.select() }, state)) {
            draft.isPull = false;
            draft.total = 100;
            draft.completed = 0;
            NOTIFY.error(state.error);
            return;
          }
          if (isMatching({ status: 'success' }, state)) {
            draft.isPull = false;
            draft.total = 100;
            draft.completed = 0;
            draft.state = state.status;
            setCurrentModel(moduleName);
            return;
          }
          draft.state = state.status;
        });
      });
      return abort;
    });
  }, [pullState.isPull]);

  const showSelect = moduleName.length === 0 || moduleName === currentModel;
  const showApply = !showSelect && moduleName.length !== 0 && isDownloaded;
  const showPull = !showSelect && !showApply;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor="ollama.model">{t('ollama.model')}</Label>
      <div className="flex w-full items-center gap-2">
        {pullState.isPull ? (
          <Progress value={(pullState.completed / pullState.total) * 100} />
        ) : (
          <Input
            type="text"
            id="ollama_model"
            autoCorrect="off"
            value={moduleName}
            onChange={e => {
              setModuleName(e.target.value);
            }}
          />
        )}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              // biome-ignore lint/a11y/useSemanticElements: <explanation>
              role="combobox"
              className={cn('justify-between', !showSelect && 'hidden')}
            >
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={t('settings.search_module')} />
              <CommandList>
                <CommandEmpty>No module found.</CommandEmpty>
                <CommandGroup>
                  {models?.map(item => {
                    return (
                      <CommandItem
                        key={item}
                        value={item}
                        onSelect={() => {
                          setCurrentModel(item);
                          setModuleName(item);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            currentModel === item ? 'opacity-100' : 'opacity-0',
                          )}
                        />
                        {item}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Button
          variant={pullState.isPull ? 'destructive' : 'default'}
          className={cn(showSelect && 'hidden')}
          onClick={() => {
            if (showApply) {
              setCurrentModel(moduleName);
              return;
            }
            if (pullState.isPull) {
              setPullState(s => {
                return produce(s, draft => {
                  draft.abort = true;
                });
              });
            } else {
              setPullState(s => {
                return produce(s, draft => {
                  draft.isPull = true;
                });
              });
            }
          }}
        >
          {pullState.isPull && t('ollama.cancel')}
          {!pullState.isPull && showPull && t('ollama.add_model')}
          {!pullState.isPull && showApply && t('ollama.apply')}
        </Button>
      </div>
    </div>
  );
}
