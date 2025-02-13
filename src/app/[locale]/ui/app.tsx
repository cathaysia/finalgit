'use client';
import { commands } from '@/bindings';
import {
  refreshBranches,
  refreshChanges,
  refreshFiles,
  refreshStashList,
  refreshTags,
  useRepoChangeTime,
} from '@/hooks/query';
import { useAppStore } from '@/hooks/use-store';

import { useEffect } from 'react';

export function App() {
  const [setRepoPath] = useAppStore(s => [s.setRepoPath, s.lang]);

  useEffect(() => {
    commands.takeRepoPath().then(v => {
      if (!v) {
        return;
      }
      setRepoPath(v);
    });
  });

  const data = useRepoChangeTime();

  useEffect(() => {
    refreshBranches();
    refreshTags();
    refreshFiles();
    refreshChanges();
    refreshStashList();
  }, [data]);
  return <></>;
}
