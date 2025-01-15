import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
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
      <div className="flex items-center gap-2" />
      <motion.span
        className="hover:text-foreground/80"
        whileHover={{ rotate: '90deg', transitionDuration: '150ms' }}
      >
        <Link href="/settings">
          <MdSettings title={t('controlbar.preference')} />
        </Link>
      </motion.span>
    </div>
  );
}
