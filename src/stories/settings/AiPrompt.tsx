import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAiState } from '@/hooks/state';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

export default function AiPrompt() {
  const { t } = useTranslation();
  const [current, promptList, setPrompt, setCurrent] = useAiState(s => [
    s.current,
    s.promptList,
    s.setPrompt,
    s.setCurrent,
  ]);

  const prompt = promptList.get(current);
  const [content, setContent] = useState<string>(prompt || '');

  const list = Array.from(promptList.keys());

  useEffect(() => {
    const prompt = promptList.get(current);
    if (prompt) {
      setContent(prompt);
    }
  }, [current, promptList]);

  useEffect(() => {
    setPrompt(current, content);
  }, [content]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('ai.prompt')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Select
          defaultValue={current}
          onValueChange={val => {
            setCurrent(val);
          }}
        >
          <SelectTrigger>
            <SelectValue defaultValue={current} />
          </SelectTrigger>
          <SelectContent>
            {list.map(name => {
              return (
                <SelectItem value={name} key={name}>
                  {name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Textarea
          className="h-52 text-base"
          onChange={val => {
            setContent(val.target.value);
          }}
          value={content}
        />
      </CardContent>
    </Card>
  );
}
