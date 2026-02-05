import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type NavProps = React.ComponentProps<typeof Link>;

export default function Nav({ className, children, href, ...props }: NavProps) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        'inline-flex h-9 w-full items-center justify-start whitespace-nowrap px-3 py-2 text-left text-sm text-muted-foreground transition',
        'hover:bg-secondary/60 hover:text-foreground',
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
