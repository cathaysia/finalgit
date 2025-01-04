'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useAppState } from '@/hooks/state';
import { useTranslations } from 'next-intl';

export default function ProfileCard() {
  const t = useTranslations();
  const [useEmoji, setUseEmoji, signoff, setSignoff] = useAppState(s => [
    s.useEmoji,
    s.setUseEmoji,
    s.signoff,
    s.setSignoff,
  ]);
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{t('profile.behaviour')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-2">
        <div className="flex justify-between">
          <Label htmlFor="profile.stash">
            {t('profile.stash_before_checkout')}
          </Label>
          <Checkbox id="profile.stash" disabled />
        </div>
        <div className="flex justify-between">
          <Label htmlFor="profile.discard">
            {t('profile.add_before_discard')}
          </Label>
          <Checkbox id="profile.discard" disabled />
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
        <div className="flex justify-between">
          <Label htmlFor="profile.signoff">{t('profile.signoff')}</Label>
          <Checkbox
            id="profile.signoff"
            checked={signoff}
            onCheckedChange={v => {
              setSignoff(v === true);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
