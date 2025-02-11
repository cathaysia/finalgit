'use client';

import { CheckIcon, ClipboardIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Button } from '../ui/button';

interface CopyButtonProps extends React.ComponentProps<'button'> {
  value: string;
  src?: string;
  variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

export async function copyToClipboardWithMeta(value: string) {
  navigator.clipboard.writeText(value);
}

export function CopyButton({
  value,
  className,
  src,
  variant = 'ghost',
  ...props
}: CopyButtonProps) {
  const t = useTranslations('copy-button');
  const [hasCopied, setHasCopied] = useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Button
      size="icon"
      variant={variant}
      className={cn(
        'relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3',
        className,
      )}
      onClick={() => {
        copyToClipboardWithMeta(value);
        setHasCopied(true);
      }}
      {...props}
    >
      <span className="sr-only">{t('Copy')}</span>
      {hasCopied ? <CheckIcon /> : <ClipboardIcon />}
    </Button>
  );
}
