'use client';

import { Check, ChevronsUpDown } from 'lucide-react';

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
import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import LangLink from './language-link';

export function LanguageCard({ locale }: { locale?: string }) {
  const languages = [
    { label: 'English', value: 'en' },
    { label: '中文', value: 'cn' },
  ];
  const t = useTranslations();
  const activeLocale = locale ?? useLocale();
  const pathname = usePathname();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          className={cn(
            'w-[200px] justify-between',
            !activeLocale && 'text-muted-foreground',
          )}
        >
          {languages.find(language => language.value === activeLocale)?.label}
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
                      language.value === activeLocale
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                  <LangLink
                    href={pathname}
                    locale={language.value}
                    lang={language.value}
                  >
                    {language.label}
                  </LangLink>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
