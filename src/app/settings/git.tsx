import { Card, CardContent, CardHeader } from '@/components/ui/card';
import GitSwitch from '@/stories/atoms/GitSwitch';
import GitCore from '@/stories/settings/GitCore';
import GitUser from '@/stories/settings/GitUser';
import { createFileRoute } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

export const Route = createFileRoute('/settings/git')({
  component: GitComponent,
});

export default function GitComponent() {
  const { t } = useTranslation();
  return (
    <>
      <GitCore />
      <GitUser />
      <Card className="w-full">
        <CardHeader>{t('profile.git.pull')}</CardHeader>
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
