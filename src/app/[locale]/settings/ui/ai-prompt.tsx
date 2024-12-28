import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAppState } from '@/hooks/state';
import { cn } from '@/lib/utils';
import { open } from '@tauri-apps/plugin-shell';
import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { FaLink } from 'react-icons/fa';
import { IoIosAdd } from 'react-icons/io';

export default function AiPrompt() {
  const t = useTranslations();
  const [current, promptList, setPrompt, setCurrent] = useAppState(s => [
    s.currentPrompt,
    s.promptList,
    s.setPrompt,
    s.setCurrentPrompt,
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
          <Button
            variant={'ghost'}
            onClick={() => {
              const value = promptList.get(current);
              if (!value) {
                return;
              }
              setPrompt(`${current} Copy`, value);
            }}
          >
            <IoIosAdd className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <Textarea
          className="h-80 resize-none text-base"
          readOnly={isConventional || isGitmoji}
          onChange={val => {
            setContent(val.target.value);
            setPrompt(current, content);
          }}
          value={content}
        />
      </CardContent>
    </Card>
  );
}
