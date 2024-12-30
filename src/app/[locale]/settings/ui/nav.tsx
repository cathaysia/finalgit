import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

type NavProps = React.ComponentProps<typeof Link>;

export default function Nav({ className, children, href, ...props }: NavProps) {
  const pathname = usePathname();

  return (
    <Link
      className={cn(
        'inline-flex h-9 w-full items-center justify-center whitespace-nowrap px-4 py-2 text-center text-lg',
        'hover:bg-secondary/80',
        pathname === href && 'bg-secondary/70',
        className,
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
