import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/settings/')({
  component: ProfileComponent,
});

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAppState } from '@/hooks/state';
import ThemeCard from '@/stories/settings/theme-card';
import { useTranslation } from 'react-i18next';

export default function ProfileComponent() {
  const { t } = useTranslation();
  const [useEmoji, setUseEmoji] = useAppState(s => [s.useEmoji, s.setUseEmoji]);
  return (
    <>
      <ThemeCard className="w-full" />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t('profile.behaviour')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-2">
          <div className="flex justify-between">
            <Label htmlFor="profile.stash">
              {t('profile.stash_before_checkout')}
            </Label>
            <Checkbox id="profile.stash" />
          </div>
          <div className="flex justify-between">
            <Label htmlFor="profile.discard">
              {t('profile.add_before_discard')}
            </Label>
            <Checkbox id="profile.discard" />
          </div>
          <div className="flex justify-between">
            <Label htmlFor="profile.use_emoji">{t('profile.use_emoji')}</Label>
            <Checkbox
              id="profile.use_emoji"
              checked={useEmoji}
              onCheckedChange={v => {
                if (v === true) {
                  setUseEmoji(true);
                }
                if (v === false) {
                  setUseEmoji(false);
                }
              }}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
