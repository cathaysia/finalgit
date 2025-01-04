'use client';

import { useAppState } from '@/hooks/state';
import { useEffect } from 'react';

export function UpdateLang({ locale }: { locale: string }) {
  const setLang = useAppState(s => s.setLang);

  useEffect(() => {
    setLang(locale);
  }, [locale]);

  return <></>;
}
