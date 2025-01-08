import { redirect } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  setRequestLocale(locale);

  redirect({
    href: '/main',
    locale: locale,
  });

  return <></>;
}
