'use client';
import SettingsMenu from '@/app/[locale]/main/ui/settings-menu';
import { cn } from '@/lib/utils';

type ControlBarProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function ControlBar({ className, ...props }: ControlBarProps) {
  return (
    <div
      data-tauri-drag-region={true}
      className={cn('flex h-8 w-full items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center gap-2" />
      <SettingsMenu showTrigger={false} />
    </div>
  );
}
