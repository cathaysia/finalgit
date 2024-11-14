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
import { cn } from '@/lib/utils';
import { open } from '@tauri-apps/plugin-shell';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { FaLink } from 'react-icons/fa';

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

  const isConventional = current === 'Conventional Commits';
  const isGitmoji = current === 'GitMoji';

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('ai.prompt')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
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
          <FaLink
            className={cn(
              'hover:text-foreground/50',
              !isConventional && !isGitmoji && 'hidden',
            )}
            onClick={() => {
              if (isConventional) {
                open('https://www.conventionalcommits.org/');
              }
              if (isGitmoji) {
                open('https://gitmoji.dev/');
              }
            }}
          />
        </div>
        <Textarea
          className="h-80 resize-none text-base"
          onChange={val => {
            setContent(val.target.value);
          }}
          value={content}
        />
      </CardContent>
    </Card>
  );
}
