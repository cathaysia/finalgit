import { commands } from '@/bindings';
import { queryModels } from '@/lib/ai';
import { useAiState } from '@/lib/state';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { match } from 'ts-pattern';
import { useAppState } from './state';

export const queryClient = new QueryClient();

export function useBranches() {
  const [repoPath] = useAppState(s => [s.repoPath]);

  return useQuery({
    queryKey: ['branches', repoPath],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.getBranchInfo(repoPath);
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
      const res = await commands.getTagInfo(repoPath);
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
      const res = await commands.getCurrentStatus(repoPath);
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

export function refreshChanges() {
  queryClient.invalidateQueries({ queryKey: ['changes'] });
}

export function useFiles() {
  const [repoPath, head] = useAppState(s => [s.repoPath, s.head]);

  return useQuery({
    queryKey: ['changes', repoPath, head],
    queryFn: async () => {
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      if (!head) {
        throw new Error('no head');
      }
      const res = await commands.getFileTree(repoPath, head);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined && head !== undefined,
  });
}

export function refreshFiles() {
  queryClient.invalidateQueries({ queryKey: ['tags'] });
}

export function useOllamaModels() {
  const [endpoint] = useAiState(s => [s.ollamaEndpoint]);

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
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.getHistory(repoPath, commit);
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