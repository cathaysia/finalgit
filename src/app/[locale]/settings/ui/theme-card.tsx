'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { MdSettings } from 'react-icons/md';

export default function ThemeCard() {
  const { setTheme } = useTheme();

  return (
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
  );
}
