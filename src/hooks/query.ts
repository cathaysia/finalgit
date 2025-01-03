'use client';
import { commands } from '@/bindings';
import { queryModels } from '@/lib/ai';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';
import { useAppState } from './state';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export function useBranches() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['branches', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.branchGetInfo(repoPath);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshBranches() {
  queryClient.invalidateQueries({ queryKey: ['branches'] });
}

export function useTags() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['tags', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.tagGetInfo(repoPath);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshTags() {
  queryClient.invalidateQueries({ queryKey: ['tags'] });
}

export function useChanges() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['changes', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.fileGetStatus(repoPath);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    refetchInterval: 2000,
    refetchOnWindowFocus: 'always',
    enabled: repoPath !== undefined,
  });
}

export function refreshChanges() {
  queryClient.invalidateQueries({ queryKey: ['changes'] });
}

export function useFiles(commit: string) {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['changes', repoPath, commit],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.fileGetTree(repoPath, commit);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshFiles() {
  queryClient.invalidateQueries({ queryKey: ['tags'] });
}

export function useOllamaModels() {
  const aiConfig = useAppState(s => s.aiConfig);
  const endpoint = aiConfig.ollama.endpoint;

  return useQuery({
    queryKey: ['ollama_models'],
    queryFn: async () => {
      const v = await queryModels(endpoint);
      const res = v.models.map(item => item.model);
      return res;
    },
  });
}

export function useModifyTimes() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['modifiedTime', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        return 0;
      }
      const res = await commands?.getHeadModifyTime(repoPath);
      return match(res)
        .with({ status: 'ok' }, v => {
          return v.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    retry: false,
    refetchInterval: 1000,
    refetchOnWindowFocus: 'always',
    refetchOnReconnect: true,
    enabled: repoPath !== undefined,
  });
}

export function refreshModifyTimes() {
  queryClient.invalidateQueries({ queryKey: ['modifiedTime'] });
}

export function useStashList() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['stash', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.stashList(repoPath);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshStashList() {
  queryClient.invalidateQueries({ queryKey: ['stash'] });
}

export function useHistory(commit: string) {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['history', repoPath, commit],
    queryFn: async () => {
      if (!repoPath || commit.length === 0) {
        throw new Error('no repoPath');
      }
      const res = await commands.commitsSince(repoPath, commit);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshHistory() {
  queryClient.invalidateQueries({ queryKey: ['history'] });
}

export function useHeadOid() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['head', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.repoGetHead(repoPath);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshHeadOid() {
  queryClient.invalidateQueries({ queryKey: ['head'] });
}

export function useBlameInfo(commit: string, file: string) {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['blame', repoPath, commit, file],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      if (file.length === 0) {
        throw new Error('bad blame path');
      }
      const res = await commands.blameOfFile(repoPath, commit, file);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(`get blame failed: ${err.error}`);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function useCommitInfo(commit: string) {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['commit', repoPath, commit],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.commitInfo(repoPath, commit);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function useHeadState() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['head_state', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.repoGetStatus(repoPath);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshHeadState() {
  queryClient.invalidateQueries({ queryKey: ['head_state'] });
}

export function useRemotes() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['remotes', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.remoteGetList(repoPath);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshRemotes() {
  queryClient.invalidateQueries({ queryKey: ['remotes'] });
}

export function useStatisOfAuthor(author: string) {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['statiscis', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.statisticsCommitsOfAuthor(repoPath, author);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function usePushstatus(branch: string) {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['pushStatus', repoPath, branch],
    queryFn: async () => {
      if (!repoPath || branch.length === 0) {
        throw new Error('no repoPath');
      }
      const res = await commands.branchGetStatus(repoPath, branch);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    refetchInterval: 2000,
    refetchOnWindowFocus: 'always',
    enabled: repoPath !== undefined,
  });
}

export function refreshPushStatus() {
  queryClient.invalidateQueries({ queryKey: ['pushStatus'] });
}
