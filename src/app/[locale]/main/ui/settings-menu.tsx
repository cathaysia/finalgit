'use client';

import AiCard from '@/app/[locale]/settings/ui/ai-card';
import AiPrompt from '@/app/[locale]/settings/ui/ai-prompt';
import GitCore from '@/app/[locale]/settings/ui/git-core';
import GitUser from '@/app/[locale]/settings/ui/git-user';
import { LanguageCard } from '@/app/[locale]/settings/ui/language-card';
import ProfileCard from '@/app/[locale]/settings/ui/profile-card';
import ThemeCard from '@/app/[locale]/settings/ui/theme-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GitSwitch from '@/ui/atoms/git-switch';
import { listen } from '@tauri-apps/api/event';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { MdSettings } from 'react-icons/md';

interface SettingsMenuProps {
  showTrigger?: boolean;
}

export default function SettingsMenu({
  showTrigger = true,
}: SettingsMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!(window as unknown as { __TAURI__?: unknown }).__TAURI__) {
      return;
    }
    let unlisten: (() => void) | undefined;
    listen('open-settings', () => {
      setOpen(true);
    }).then(handler => {
      unlisten = handler;
    });
    return () => {
      unlisten?.();
    };
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTrigger ? (
        <DialogTrigger asChild>
          <motion.button
            type="button"
            className="hover:text-foreground/80"
            whileHover={{ rotate: '90deg', transitionDuration: '150ms' }}
            aria-label={t('controlbar.preference')}
          >
            <MdSettings title={t('controlbar.preference')} />
          </motion.button>
        </DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t('controlbar.preference')}</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="profile" className="flex h-[70vh] flex-col gap-3">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="profile">{t('settings.profile')}</TabsTrigger>
            <TabsTrigger value="git">{t('settings.git')}</TabsTrigger>
            <TabsTrigger value="ai">{t('settings.ai')}</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-full pr-3">
            <TabsContent value="profile" className="m-0">
              <div className="flex flex-col gap-4">
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
              </div>
            </TabsContent>
            <TabsContent value="git" className="m-0">
              <div className="flex flex-col gap-4">
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
              </div>
            </TabsContent>
            <TabsContent value="ai" className="m-0">
              <div className="flex flex-col gap-4">
                <AiCard />
                <AiPrompt />
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
