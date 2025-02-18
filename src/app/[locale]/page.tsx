'use client';
import { useAppStore } from '@/hooks/use-store';
import { redirect } from '@/i18n/routing';
import { usePathname } from 'next/navigation';

export default function Page() {
  const [isFirst] = useAppStore(s => [s.firstStart]);
  let local = usePathname();
  local = local.substring(1);

  if (isFirst) {
    redirect({
      href: '/guide',
      locale: local,
    });
  } else {
    redirect({
      href: '/main',
      locale: local,
    });
  }

  return <></>;
}
