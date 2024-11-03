import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { useTranslation } from 'react-i18next';
import { MdSettings } from 'react-icons/md';

type ControlBarProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function ControlBar({ className, ...props }: ControlBarProps) {
  const { t } = useTranslation();
  return (
    <div
      data-tauri-drag-region={true}
      className={cn('flex w-full justify-between', className)}
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
      <Link to="/settings">
        <MdSettings className="mr-2" title={t('controlbar.preference')} />
      </Link>
    </div>
  );
}