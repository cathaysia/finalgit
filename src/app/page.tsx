'use client';
import { useAppStore } from '@/hooks/use-store';
import { redirect } from 'next/navigation';

export default function Page() {
  const lang = useAppStore(s => s.lang);
  if (lang === 'cn') {
    redirect('/cn');
  }

  redirect('/en');
  return <></>;
}
