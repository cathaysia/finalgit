import type { CommitInfo } from '@/bindings';
import { expect, test } from 'vitest';
import { filterCommits } from './commit-filter';

const mockData: CommitInfo[] = [];

for (let i = 10; i < 30; ++i) {
  const author = i % 2 == 0 ? 'Bob' : 'Alice';
  const time = new Date(`2024-01-${i}`).getTime() / 1000;
  mockData.push({
    time: time,
    oid: `a${i}${i}${i}`.slice(0, 6),
    author: {
      time: time,
      name: author,
      email: 'xxx',
    },
    commiter: {
      time: time,
      name: author,
      email: 'xxx',
    },
    message: `hello ${i}`,
    summary: `hello ${i}`,
  });
}

test('filter', () => {
  const v: [string, number][] = [
    ['a10101', 1],
    ['HEAD', 1],
    ['HEAD HEAD', 1],
    ['HEAD a11111', 2],
    ['@', 1],
    ['since=2024-01-01', 20],
    ['since=2024-01-10', 20],
    ['since=2024-01-20', 10],
    ['since=2025-01-20', 0],
    ['until=2025-01-20', 20],
    ['until=2024-01-20', 11],
    ['until=2024-01-30', 20],
    ['skip=10', 10],
    ['author=Bob', 10],
    ['commiter=Alice', 10],
    ['grep=.*', 20],
    ['HEAD..', 19],
    ['HEAD...', 20],
    ['..HEAD', 0],
    ['...HEAD', 1],
    ['HEAD..HEAD', 0],
    ['HEAD...HEAD', 0],
    ['HEAD...a11111', 1],
    ['HEAD...a29292', 19],
    ['@...a29292', 19],
    [':/hello', 20],
    ['@~10', 10],
    ['@~-10', 20],
    ['@~{/hello}', 20],
    ['a20202~@', 10],
    ['a20202~!', 9],
    ['a20202~-', 10],
    ['HEAD~{2024-01-02}', 20],
    ['HEAD~{yesterday}', 0],
    ['HEAD~{10}', 10],
    ['HEAD~{-10}', 20],
    ['HEAD~{}', 20],
    ['HEAD~{one day ago}', 20],
    ['HEAD~{one day after}', 0],
  ];

  for (const [expr, res] of v) {
    expect(filterCommits(expr, mockData).length).toBe(res);
  }
});
