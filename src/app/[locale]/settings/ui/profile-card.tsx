'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAppStore } from '@/hooks/use-store';
import { useTranslations } from 'next-intl';

export default function ProfileCard() {
  const t = useTranslations();
  const [
    useEmoji,
    setUseEmoji,
    signoff,
    setSignoff,
    setFirstStart,
    firstStart,
  ] = useAppStore(s => [
    s.useEmoji,
    s.setUseEmoji,
    s.signoff,
    s.setSignoff,
    s.setFirstStart,
    s.firstStart,
  ]);
  return (
    <Card className="w-full border-border/60 bg-background/80 shadow-sm backdrop-blur dark:bg-background/60">
      <CardHeader>
        <CardTitle>{t('profile.behaviour')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between gap-2">
        <div className="flex justify-between">
          <Label htmlFor="profile.stash">
            {t('profile.stash_before_checkout')}
          </Label>
          <Switch id="profile.stash" disabled />
        </div>
        <div className="flex justify-between">
          <Label htmlFor="profile.discard">
            {t('profile.add_before_discard')}
          </Label>
          <Switch id="profile.discard" disabled />
        </div>
        <div className="flex justify-between">
          <Label htmlFor="profile.use_emoji">{t('profile.use_emoji')}</Label>
          <Switch
            id="profile.use_emoji"
            checked={useEmoji}
            onCheckedChange={v => {
              setUseEmoji(v);
            }}
          />
        </div>
        <div className="flex justify-between">
          <Label htmlFor="profile.signoff">{t('profile.signoff')}</Label>
          <Switch
            id="profile.signoff"
            checked={signoff}
            onCheckedChange={v => {
              setSignoff(v);
            }}
          />
        </div>
        <div className="flex justify-between">
          <Label htmlFor="profile.run_guid_next">
            {t('profile.run_guide')}
          </Label>
          <Switch
            id="profile.run_guid_next"
            checked={firstStart}
            onCheckedChange={v => {
              setFirstStart(v);
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
