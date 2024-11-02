import { type CommitInfo, commands } from '@/bindings';
import { useQuery } from '@tanstack/react-query';
import { isMatching, match } from 'ts-pattern';
import { queryClient, useHeadState } from './query';
import { useAppState } from './state';

export interface BisectState {
  bad: string | undefined;
  good: string | undefined;
  next: string | undefined;
  firstBad: string | undefined;
  isBisecting: boolean;
}
export function useBisectState(info: CommitInfo[]): BisectState {
  const { data: state } = useHeadState();
  const { data: range } = useBisectRange();
  const { data: bisectNext } = useBisectNext();
  const isBisecting = isMatching('Bisect', state);
  if (!isBisecting) {
    return {
      bad: undefined,
      good: undefined,
      next: undefined,
      firstBad: undefined,
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
  const clamp: [number | undefined, number | undefined] = [
    undefined,
    undefined,
  ];
  let good: string | undefined;
  let bad: string | undefined;
  let firstBad: string | undefined;

  if (goodIdx?.length) {
    clamp[0] = goodIdx[0];
    good = info[clamp[0]].oid;
  }
  if (badIdx?.length) {
    clamp[1] = badIdx[badIdx.length - 1];
    bad = info[clamp[1]].oid;
  }

  if (clamp[0] !== undefined && clamp[1] !== undefined) {
    if (clamp[0] - clamp[1] === 1) {
      firstBad = info[clamp[1]].oid;
    }
  }

  let next = bisectNext;
  if (firstBad) {
    next = undefined;
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
  const [repoPath] = useAppState(s => [s.repoPath]);
  const { data: state } = useHeadState();

  return useQuery({
    queryKey: ['bisect_range', repoPath],
    queryFn: async () => {
      if (state) {
        if (!isMatching('Bisect', state)) {
          return;
        }
      }
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.bisectGetRange(repoPath);
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

export function refreshBisectRange() {
  queryClient.invalidateQueries({ queryKey: ['bisect_range'] });
}

export function useBisectNext() {
  const [repoPath] = useAppState(s => [s.repoPath]);
  const { data: state } = useHeadState();

  return useQuery({
    queryKey: ['bisect_next', repoPath],
    queryFn: async () => {
      if (state) {
        if (!isMatching('Bisect', state)) {
          return;
        }
      }
      if (!repoPath) {
        throw new Error('no repoPath');
      }
      const res = await commands.bisectGetNext(repoPath);
      return match(res)
        .with({ status: 'ok' }, res => {
          return res.data || undefined;
        })
        .with({ status: 'error' }, err => {
          throw new Error(err.error);
        })
        .exhaustive();
    },
    enabled: repoPath !== undefined,
  });
}

export function refreshBisectNext() {
  queryClient.invalidateQueries({ queryKey: ['bisect_next'] });
}
