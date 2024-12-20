'use client';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import GitSwitch from '@/stories/atoms/git-switch';
import GitCore from '@/app/settings/ui/git-core';
import GitUser from '@/app/settings/ui/git-user';
import { useTranslation } from 'react-i18next';

export default function GitComponent() {
  const { t } = useTranslation();
  return (
    <>
      <GitCore />
      <GitUser />
      <Card className="w-full">
        <CardHeader>{t('profile.git.pull.header')}</CardHeader>
        <CardContent className="flex flex-col gap-2">
          <GitSwitch
            name={t('profile.git.pull.rebase')}
            id="profile.git.pull.rebase"
            opt={'pull.rebase'}
          />
          <GitSwitch
            name={t('profile.git.pull.ff')}
            id="profile.git.pull.ff"
            opt={'pull.ff'}
          />
        </CardContent>
      </Card>
    </>
  );
}
