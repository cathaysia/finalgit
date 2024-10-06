'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTranslation } from 'react-i18next';
import { MdSettings } from 'react-icons/md';
import { LanguageCard } from '../atoms/LanguageCard';

export interface ThemeCardProps extends React.ComponentProps<typeof Card> {}

export default function ThemeCard({ className, ...props }: ThemeCardProps) {
  const { setTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <Card className={cn(className)} {...props}>
      <CardHeader>
        <CardTitle>Theme</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-col gap-2">
        <div className="flex w-full justify-between">
          <Button className="w-1/4" onClick={() => setTheme('light')}>
            <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button className="w-1/4" onClick={() => setTheme('dark')}>
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button className="w-1/4" onClick={() => setTheme('system')}>
            <MdSettings className="absolute h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <Label>{t('profile.language')}</Label>
          <LanguageCard />
        </div>
      </CardContent>
    </Card>
  );
}
