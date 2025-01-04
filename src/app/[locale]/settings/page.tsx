import ThemeCard from '@/app/[locale]/settings/ui/theme-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { getTranslations } from 'next-intl/server';
import { LanguageCard } from './ui/language-card';
import ProfileCard from './ui/profile-card';
import { UpdateLang } from './ui/update-lang';

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const t = await getTranslations({ locale });

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Theme</CardTitle>
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-2">
          <ThemeCard />
          <div className="flex w-full items-center justify-between">
            <Label>{t('profile.language')}</Label>
            <LanguageCard locale={locale} />
          </div>
        </CardContent>
      </Card>
      <ProfileCard />
      <UpdateLang locale={locale} />
    </>
  );
}
