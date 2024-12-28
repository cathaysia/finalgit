import MainPanel from '@/stories/panels/main-panel';
import { setRequestLocale } from 'next-intl/server';
import Commit from './ui/main/commit';
import Control from './ui/main/control';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  setRequestLocale(locale);

  return (
    <div
      className="grid h-screen w-screen grid-cols-4 gap-2 p-2"
      data-tauri-drag-region
    >
      <Control />
      <MainPanel />
      <Commit />
    </div>
  );
}
