import { type CommitInfo, commands } from '@/bindings';
import { useQuery } from '@tanstack/react-query';
import { isMatching, match } from 'ts-pattern';
import { queryClient, useHeadState } from './use-query';
import { useAppStore } from './use-store';

export interface BisectState {
  bad: string | null;
  good: string | null;
  next: string | null;
  firstBad: string | null;
  isBisecting: boolean;
}
export function useBisectState(info: CommitInfo[]): BisectState {
  const { data: state } = useHeadState();
  const { data: range } = useBisectRange();
  const { data: bisectNext } = useBisectNext();
  const isBisecting = isMatching('Bisect', state);
  if (!isBisecting) {
    return {
      bad: null,
      good: null,
      next: null,
      firstBad: null,
      isBisecting: false,
    };
  }

  const goodIdx = range?.good
    .map(item => {
      return info.findIndex(v => v.oid === item);
    })
    .filter(item => item !== -1)
    .sort((a, b) => a - b);
  const badIdx = range?.bad
    .map(item => {
      return info.findIndex(v => v.oid === item);
    })
    .filter(item => item !== -1)
    .sort((a, b) => a - b);
  const clamp: [number | null, number | null] = [null, null];
  let good: string | null = null;
  let bad: string | null = null;
  let firstBad: string | null = null;

  if (goodIdx?.length) {
    clamp[0] = goodIdx[0];
    good = info[clamp[0]].oid;
  }
  if (badIdx?.length) {
    clamp[1] = badIdx[badIdx.length - 1];
    bad = info[clamp[1]].oid;
  }

  if (clamp[0] !== null && clamp[1] !== null) {
    if (clamp[0] - clamp[1] === 1) {
      firstBad = info[clamp[1]].oid;
    }
  }

  let next = bisectNext || null;
  if (firstBad) {
    next = null;
  }

  return {
    bad: bad,
    good: good,
    next: next,
    firstBad: firstBad,
    isBisecting: isMatching('Bisect', state),
  };
}

export function useBisectRange() {
  const [repoPath] = useAppStore(s => [s.repoPath]);
  const { data: state } = useHeadState();

  return useQuery({
    queryKey: ['bisect_range', repoPath],
    queryFn: async () => {
      if (state) {
        if (!isMatching('Bisect', state)) {
          return null;
        }
      }
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.bisectGetRange(repoPath);
      return (
        match(res)
          .with({ status: 'ok' }, res => {
            return res.data;
          })
          .with({ status: 'error' }, err => {
            throw new Error(err.error);
          })
          .exhaustive() || null
      );
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshBisectRange() {
  queryClient.invalidateQueries({ queryKey: ['bisect_range'] });
}

export function useBisectNext() {
  const [repoPath] = useAppStore(s => [s.repoPath]);
  const { data: state } = useHeadState();

  return useQuery({
    queryKey: ['bisect_next', repoPath],
    queryFn: async () => {
      if (state) {
        if (!isMatching('Bisect', state)) {
          return null;
        }
      }
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.bisectGetNext(repoPath);
      return (
        match(res)
          .with({ status: 'ok' }, res => {
            return res.data || undefined;
          })
          .with({ status: 'error' }, err => {
            throw new Error(err.error);
          })
          .exhaustive() || null
      );
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshBisectNext() {
  queryClient.invalidateQueries({ queryKey: ['bisect_next'] });
}
