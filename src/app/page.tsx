'use client';
import { useAppState } from '@/hooks/state';
import { redirect } from 'next/navigation';

export default function Page() {
  const lang = useAppState(s => s.lang);
  if (lang === 'cn') {
    redirect('/cn');
  }

  redirect('/en');
  return <></>;
}
