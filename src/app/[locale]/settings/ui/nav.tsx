import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type NavProps = React.ComponentProps<typeof Link>;

export default function Nav({ className, children, href, ...props }: NavProps) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        'inline-flex h-9 w-full items-center justify-center whitespace-nowrap px-4 py-2 text-center text-sm transition',
        'hover:bg-secondary/70 hover:text-foreground',
        pathname === href &&
          'bg-secondary/60 text-foreground shadow-sm ring-1 ring-border',
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
