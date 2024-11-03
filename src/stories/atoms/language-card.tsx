import i18n from '@/locales';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

export function LanguageCard() {
  const [setLang] = useAppState(s => [s.setLang]);
  const lang = i18n.language;
  const languages = [
    { label: 'English', value: 'en_US' },
    { label: '中文', value: 'zh_CN' },
  ];
  const { t } = useTranslation();

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
                <CommandItem
                  value={language.label}
                  key={language.value}
                  onSelect={() => {
                    i18n.changeLanguage(language.value);
                    setLang(language.value);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      language.value === lang ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
