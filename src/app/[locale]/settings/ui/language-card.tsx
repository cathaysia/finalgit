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
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export async function LanguageCard({ locale }: { locale: string }) {
  const languages = [
    { label: 'English', value: 'en' },
    { label: '中文', value: 'cn' },
  ];
  const t = await getTranslations({ locale });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          // biome-ignore lint/a11y/useSemanticElements: <explanation>
          role="combobox"
          className={cn(
            'w-[200px] justify-between',
            !locale && 'text-muted-foreground',
          )}
        >
          {languages.find(language => language.value === locale)?.label}
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
                      language.value === locale ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  <Link href={`/${language.value}/settings`}>
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
