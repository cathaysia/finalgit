import clsx from 'clsx';
import Link from 'next/link';
import type { ReactElement } from 'react';

export interface NavProps {
  to: string;
  text: string | ReactElement;
}
export function Nav({ to, text }: NavProps) {
  return (
    <Link
      href={to}
      className={clsx(
        'inline-flex w-full items-center justify-center whitespace-nowrap text-lg',
        'h-9 w-24 px-4 py-2 text-center',
        '[&.active]:bg-neutral-900 [&.active]:font-bold [&.active]:text-neutral-50',
        'hover:bg-neutral-200 dark:hover:bg-neutral-50/90 [&.active]:hover:bg-neutral-900/90',
      )}
    >
      {text}
    </Link>
  );
}
