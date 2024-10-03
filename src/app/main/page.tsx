'use client';

import { redirect } from 'next/navigation';
import { useAppState } from '@/lib/state';

export default function Home() {
  const [isDiffview] = useAppState(s => [s.isDiffView]);
  if (isDiffview) {
    redirect('/main/diffview/');
  } else {
    redirect('/main/workspace/');
  }
  return <div />;
}
