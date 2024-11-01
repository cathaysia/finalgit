import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
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
import { useOllamaModels } from '@/hooks/query';
import { useAiState } from '@/hooks/state';
import { fetchModel } from '@/lib/ai/ollama';
import NOTIFY from '@/lib/notify';
import { cn } from '@/lib/utils';
import { produce } from 'immer';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { P, isMatching } from 'ts-pattern';

export default function AiCard() {
  const { t } = useTranslation();
  const [endpoint, currentModel, setCurrentModel, setEndpoint] = useAiState(
    s => [
      s.ollamaEndpoint,
      s.ollamaCurrentModel,
      s.setOllamaModel,
      s.setOllamaEndpoint,
    ],
  );

  const { error, data: models } = useOllamaModels();
  if (error) {
    NOTIFY.error(error.message);
  }
  if (models && !currentModel && models.length > 0) {
    setCurrentModel(models[0]);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('profile.ai_provider')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="Ollama">
            <AccordionTrigger>{t('Ollama')}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

function OllamaPull() {
  const { t } = useTranslation();
  const [endpoint, currentModel, setCurrentModel] = useAiState(s => [
    s.ollamaEndpoint,
    s.ollamaCurrentModel,
    s.setOllamaModel,
  ]);

  const [pullState, setPullState] = useState<{
    isPull: boolean;
    tatal: number;
    completed: number;
    state: string;
    abort: boolean;
  }>({
    isPull: false,
    tatal: 100,
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
            draft.tatal = 100;
            draft.completed = 0;
            return;
          }
          if (isMatching({ completed: P.select() }, state)) {
            draft.completed = state.completed;
            draft.tatal = state.total;
            draft.tatal = state.total;
            draft.completed = state.completed;
          }
          if (isMatching({ error: P.select() }, state)) {
            draft.isPull = false;
            draft.tatal = 100;
            draft.completed = 0;
            NOTIFY.error(state.error);
            return;
          }
          if (isMatching({ status: 'success' }, state)) {
            draft.isPull = false;
            draft.tatal = 100;
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
          <Progress value={(pullState.completed / pullState.tatal) * 100} />
        ) : (
          <Input
            type="text"
            id="ollama_model"
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
              role="combobox"
              aria-expanded={open}
              className={cn('justify-between', !showSelect && 'hidden')}
            >
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder={t('settings.search_langing')} />
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
