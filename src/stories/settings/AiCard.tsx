'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import NOTIFY from '@/lib/notify';
import { useOllamaModels } from '@/lib/query';
import { useAiState } from '@/lib/state';
import { useTranslation } from 'react-i18next';

export default function AiCard() {
  const { t } = useTranslation();
  const [endpoint, currentModel, setCurrentModel] = useAiState(s => [
    s.ollamaEndpoint,
    s.ollamaCurrentModel,
    s.setOllamaModel,
  ]);

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
                />
              </div>
              <div>
                <Label htmlFor="ollama.model">{t('ollama.model')}</Label>
                <Select
                  onValueChange={value => setCurrentModel(value)}
                  defaultValue={currentModel}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={currentModel} />
                  </SelectTrigger>
                  <SelectContent>
                    {models?.map(item => {
                      return (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <div className="flex w-full items-center gap-2">
                  <Input className="mt-2" type="text" id="ollama_model" />
                  <Button>{t('ollama.add_model')}</Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
