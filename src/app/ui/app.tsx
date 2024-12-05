'use client';
import { commands } from '@/bindings';
import {
  refreshBranches,
  refreshChanges,
  refreshFiles,
  refreshStashList,
  refreshTags,
  useModifyTimes,
} from '@/hooks/query';
import { useAppState } from '@/hooks/state';
import NOTIFY from '@/lib/notify';
import i18n from '@/locales';

import { useEffect } from 'react';

export function App() {
  const [setRepoPath, lang] = useAppState(s => [s.setRepoPath, s.lang]);

  useEffect(() => {
    i18n.changeLanguage(lang);
    commands.takeRepoPath().then(v => {
      if (!v) {
        return;
      }
      setRepoPath(v);
    });
  });

  const { error, data } = useModifyTimes();
  if (error) {
    NOTIFY.error(error.message);
  }

  useEffect(() => {
    refreshBranches();
    refreshTags();
    refreshFiles();
    refreshChanges();
    refreshStashList();
  }, [data]);
  return <></>;
}
