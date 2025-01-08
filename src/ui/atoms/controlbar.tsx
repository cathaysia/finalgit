'use client';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { IoClose, IoRemove } from 'react-icons/io5';
import { MdSettings } from 'react-icons/md';
import { RiExpandLeftRightFill } from 'react-icons/ri';
import { RiContractLeftRightFill } from 'react-icons/ri';

type ControlBarProps = React.HtmlHTMLAttributes<HTMLDivElement>;

export default function ControlBar({ className, ...props }: ControlBarProps) {
  const t = useTranslations();
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    getCurrentWindow()
      .isMaximizable()
      .then(item => {
        setIsMaximized(!item);
      });
  });

  return (
    <div
      data-tauri-drag-region={true}
      className={cn('flex h-8 w-full items-center justify-between', className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <div
          className="group h-3 w-3 rounded-lg bg-red-600"
          onClick={() => {
            getCurrentWindow().close();
          }}
        >
          <IoClose className="hidden h-3 w-3 text-gray-800 group-hover:block" />
        </div>
        <div
          className="group h-3 w-3 rounded-lg bg-yellow-600"
          onClick={() => {
            getCurrentWindow().minimize();
          }}
        >
          <IoRemove className="hidden h-3 w-3 text-gray-800 group-hover:block" />
        </div>
        <div
          className="group h-3 w-3 rounded-lg bg-green-600"
          onClick={() => {
            getCurrentWindow().toggleMaximize();
            setIsMaximized(!isMaximized);
          }}
        >
          {isMaximized ? (
            <RiContractLeftRightFill className="hidden h-3 w-3 rotate-45 text-gray-800 group-hover:block" />
          ) : (
            <RiExpandLeftRightFill className="hidden h-3 w-3 rotate-45 text-gray-800 group-hover:block" />
          )}
        </div>
      </div>
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
