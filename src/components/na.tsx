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
        'hover:bg-secondary/80',
      )}
    >
      {text}
    </Link>
  );
}
