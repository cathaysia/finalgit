'use client';

import AiCard from '@/app/[locale]/settings/ui/ai-card';
import AiPrompt from '@/app/[locale]/settings/ui/ai-prompt';
import GitCore from '@/app/[locale]/settings/ui/git-core';
import GitUser from '@/app/[locale]/settings/ui/git-user';
import { LanguageCard } from '@/app/[locale]/settings/ui/language-card';
import ThemeCard from '@/app/[locale]/settings/ui/theme-card';
import { commands } from '@/bindings';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGitOpts } from '@/hooks/use-query';
import { useAppStore } from '@/hooks/use-store';
import NOTIFY from '@/lib/notify';
import { listen } from '@tauri-apps/api/event';
import { motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { type ReactNode, useEffect, useState } from 'react';
import {
  MdAutoAwesome,
  MdCode,
  MdPersonOutline,
  MdSettings,
} from 'react-icons/md';
import { match } from 'ts-pattern';

interface SettingsMenuProps {
  showTrigger?: boolean;
}

function SettingsSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`flex flex-col gap-3 ${className ?? ''}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <Separator />
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function SettingsItem({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 py-2">
      <div className="flex flex-col gap-1">
        <Label className="font-medium text-sm">{title}</Label>
        {description ? (
          <span className="text-muted-foreground text-xs">{description}</span>
        ) : null}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function useGitBooleanOption(opt: string) {
  const { data: gitOpt } = useGitOpts(opt);
  const [repoPath] = useAppStore(s => [s.repoPath]);
  const [value, setValue] = useState(false);

  useEffect(() => {
    if (gitOpt == null) {
      return;
    }
    setValue(gitOpt === 'true');
  }, [repoPath, gitOpt]);

  const updateValue = async (next: boolean) => {
    if (!repoPath) {
      return;
    }
    const res = await commands?.configSet(
      repoPath,
      opt,
      next ? 'true' : 'false',
    );
    if (!res) {
      setValue(next);
      return;
    }
    match(res)
      .with({ status: 'ok' }, _ => {
        setValue(next);
      })
      .with({ status: 'error' }, err => {
        NOTIFY.error(err.error);
      });
  };

  return [value, updateValue, repoPath] as const;
}

export default function SettingsMenu({
  showTrigger = true,
}: SettingsMenuProps) {
  const t = useTranslations();
  const locale = useLocale();
  const [open, setOpen] = useState(false);
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
  const [pullRebase, setPullRebase, repoPath] =
    useGitBooleanOption('pull.rebase');
  const [pullFastForward, setPullFastForward] = useGitBooleanOption('pull.ff');

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
      <DialogContent className="sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>{t('controlbar.preference')}</DialogTitle>
        </DialogHeader>
        <Tabs
          defaultValue="profile"
          className="grid h-[72vh] grid-cols-[minmax(180px,24%)_minmax(0,1fr)] gap-0 overflow-hidden rounded-lg border bg-background/60"
          orientation="vertical"
        >
          <TabsList className="flex h-full w-36 flex-col items-stretch justify-start gap-1 bg-muted/30 p-2">
            <TabsTrigger
              value="profile"
              className="justify-start gap-2 rounded-md px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <MdPersonOutline className="h-4 w-4" />
              {t('settings.profile')}
            </TabsTrigger>
            <TabsTrigger
              value="git"
              className="justify-start gap-2 rounded-md px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <MdCode className="h-4 w-4" />
              {t('settings.git')}
            </TabsTrigger>
            <TabsTrigger
              value="ai"
              className="justify-start gap-2 rounded-md px-3 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <MdAutoAwesome className="h-4 w-4" />
              {t('settings.ai')}
            </TabsTrigger>
          </TabsList>
          <ScrollArea className="h-full">
            <div className="flex h-full flex-col gap-6 px-6 py-5">
              <TabsContent value="profile" className="m-0">
                <div className="flex flex-col gap-6">
                  <SettingsSection title="Theme">
                    <ThemeCard />
                  </SettingsSection>
                  <SettingsSection title={t('profile.language')}>
                    <SettingsItem
                      title={t('profile.language')}
                      description="Select the app language used across the UI."
                    >
                      <LanguageCard locale={locale} />
                    </SettingsItem>
                  </SettingsSection>
                  <SettingsSection title={t('profile.behaviour')}>
                    <SettingsItem
                      title={t('profile.stash_before_checkout')}
                      description="Temporarily stash changes before checking out another branch."
                    >
                      <Switch id="profile.stash" disabled />
                    </SettingsItem>
                    <SettingsItem
                      title={t('profile.add_before_discard')}
                      description="Stage changes automatically before discarding."
                    >
                      <Switch id="profile.discard" disabled />
                    </SettingsItem>
                    <SettingsItem
                      title={t('profile.use_emoji')}
                      description="Add emoji reactions in the UI and commit messages."
                    >
                      <Switch
                        id="profile.use_emoji"
                        checked={useEmoji}
                        onCheckedChange={v => {
                          setUseEmoji(v);
                        }}
                      />
                    </SettingsItem>
                    <SettingsItem
                      title={t('profile.signoff')}
                      description="Append a Signed-off-by trailer to commits."
                    >
                      <Switch
                        id="profile.signoff"
                        checked={signoff}
                        onCheckedChange={v => {
                          setSignoff(v);
                        }}
                      />
                    </SettingsItem>
                    <SettingsItem
                      title={t('profile.run_guide')}
                      description="Show the onboarding guide on next launch."
                    >
                      <Switch
                        id="profile.run_guid_next"
                        checked={firstStart}
                        onCheckedChange={v => {
                          setFirstStart(v);
                        }}
                      />
                    </SettingsItem>
                  </SettingsSection>
                </div>
              </TabsContent>
              <TabsContent value="git" className="m-0">
                <div className="flex flex-col gap-6">
                  <GitCore />
                  <GitUser />
                  <SettingsSection title={t('profile.git.pull.header')}>
                    <SettingsItem
                      title={t('profile.git.pull.rebase')}
                      description="Automatically rebase when pulling from the remote."
                    >
                      <Switch
                        id="profile.git.pull.rebase"
                        checked={pullRebase}
                        disabled={!repoPath}
                        onCheckedChange={setPullRebase}
                      />
                    </SettingsItem>
                    <SettingsItem
                      title={t('profile.git.pull.ff')}
                      description="Only allow fast-forward merges when pulling."
                    >
                      <Switch
                        id="profile.git.pull.ff"
                        checked={pullFastForward}
                        disabled={!repoPath}
                        onCheckedChange={setPullFastForward}
                      />
                    </SettingsItem>
                  </SettingsSection>
                </div>
              </TabsContent>
              <TabsContent value="ai" className="m-0">
                <div className="flex flex-col gap-6">
                  <AiCard />
                  <AiPrompt />
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
