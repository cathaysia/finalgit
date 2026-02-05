'use client';

import { cn } from '@/lib/utils';
import { Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ThemeCard() {
  const { setTheme, theme } = useTheme();
  const items = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Laptop },
  ] as const;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {items.map(item => {
        const Icon = item.icon;
        const isActive = theme === item.value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setTheme(item.value)}
            className={cn(
              'group flex min-h-24 flex-col items-start gap-3 rounded-xl border px-4 py-3 text-left transition',
              'hover:border-primary/40 hover:bg-muted/40',
              isActive && 'border-primary/60 bg-muted/60 ring-1 ring-primary/20',
            )}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-background/80">
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm">{item.label}</span>
              <span className="text-muted-foreground text-xs">
                {item.value === 'system'
                  ? 'Match system appearance'
                  : `Always use ${item.label.toLowerCase()} mode`}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
