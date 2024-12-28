import { cn } from '@/lib/utils';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { MdSettings } from 'react-icons/md';

type ControlBarProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function ControlBar({ className, ...props }: ControlBarProps) {
  const t = useTranslations();
  return (
    <div
      data-tauri-drag-region={true}
      className={cn('flex h-8 w-full items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-lg bg-red-600"
          onClick={() => {
            getCurrentWindow().close();
          }}
        />
        <div
          className="h-3 w-3 rounded-lg bg-yellow-600"
          onClick={() => {
            getCurrentWindow().minimize();
          }}
        />
        <div
          className="h-3 w-3 rounded-lg bg-green-600"
          onClick={() => {
            getCurrentWindow().toggleMaximize();
          }}
        />
      </div>
      <Link href="/settings" className="hover:text-foreground/80">
        <MdSettings className="mr-2" title={t('controlbar.preference')} />
      </Link>
    </div>
  );
}
