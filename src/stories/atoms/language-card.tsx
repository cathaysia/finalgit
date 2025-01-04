'use client';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAppState } from '@/hooks/state';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageCard() {
  const pathanme = usePathname();
  const p = /\/(\w+)\/?.*/.exec(pathanme) || [];
  const lang = p[1];
  const [setLang] = useAppState(s => [s.setLang]);
  const languages = [
    { label: 'English', value: 'en' },
    { label: '中文', value: 'cn' },
  ];
  const t = useTranslations();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'w-[200px] justify-between',
            !lang && 'text-muted-foreground',
          )}
        >
          {lang
            ? languages.find(language => language.value === lang)?.label
            : 'Select language'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={t('settings.search_langing')} />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map(language => (
                <CommandItem value={language.label} key={language.value}>
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      language.value === lang ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <Link
                    href={`/${language.value}/settings`}
                    onClick={() => {
                      setLang(language.value);
                    }}
                  >
                    {language.label}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
