'use client';
import MainPanel from '@/stories/panels/MainPanel';
import { useAppState } from '@/lib/state';
import { redirect } from 'next/navigation';

export default function DiffView() {
  const [isDiffview] = useAppState(s => [s.isDiffView]);
  if (!isDiffview) {
    redirect('/main/');
  }
  return (
    <div className="h-full flex gap-2 w-full">
      <MainPanel className="w-full h-full" />
    </div>
  );
}
