'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import ThemeCard from '@/stories/settings/ThemeCard';
import { useTranslation } from 'react-i18next';

export default function ProfileComponent() {
    const { t } = useTranslation();
    return (
        <>
            <ThemeCard className="w-full" />
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>{t('profile.behaviour')}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-between">
                    <Label htmlFor="profile.stash">
                        {t('profile.stash_before_checkout')}
                    </Label>
                    <Checkbox id="profile.stash" />
                </CardContent>
            </Card>
        </>
    );
}