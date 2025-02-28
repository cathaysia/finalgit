'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppStore } from '@/hooks/use-store';
import { redirect as routedRedirect } from '@/i18n/routing';
import { GetProjectList, IdeType } from '@/lib/guide';
import { useLocale, useTranslations } from 'next-intl';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  const t = useTranslations('guide');
  const locale = useLocale();
  const [projects, setProjects] = useState<string[]>([]);
  const [addRepoPath, setFirstStart, repos, setLang] = useAppStore(s => [
    s.addRepoPath,
    s.setFirstStart,
    s.projects,
    s.setLang,
  ]);

  useEffect(() => {
    (async () => {
      const res = await GetProjectList(IdeType.Vscode, null);
      if (res) {
        setProjects(res);
      }
    })();
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2 p-2">
      <div
        className={`w-full items-center ${
          projects.length > 0 ? 'flex max-w-5xl gap-8' : 'max-w-md'
        }`}
      >
        <div
          className={`${projects.length > 0 ? 'w-80' : 'w-full'} space-y-8 ${
            projects.length === 0 ? 'flex flex-col justify-center' : ''
          }`}
        >
          <div className="text-center">
            <Label className="mb-4 block font-bold text-xl">
              {t('language')}
            </Label>
            <Select
              value={locale}
              onValueChange={lang => {
                setLang(lang);
                redirect(`/${lang}/guide`);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cn">中文</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-center">
            <Label className="mb-4 block font-bold text-xl">
              {t('import')}
            </Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('import_project')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vscode">VS Code</SelectItem>
                <SelectItem value="idea">IntelliJ IDEA</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {projects.length > 0 && (
          <div className="mt-4 flex-1">
            <ul className="space-y-2">
              {projects.map(project => (
                <li
                  key={project}
                  className="flex items-center justify-between gap-2 rounded border p-2 hover:bg-secondary"
                >
                  <span>{project}</span>
                  <Button
                    className="w-16"
                    disabled={repos.has(project)}
                    onClick={() => {
                      addRepoPath(project);
                    }}
                  >
                    {repos.has(project) ? t('imported') : t('import')}
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Button
        className="flex self-end"
        onClick={() => {
          setFirstStart(false);
          routedRedirect({
            locale: locale,
            href: '/',
          });
        }}
      >
        completed
      </Button>
    </div>
  );
}
