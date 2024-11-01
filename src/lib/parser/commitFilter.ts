import type { CommitInfo } from '@/bindings';
import {
  AnchorKind,
  PosKind,
  RevKind,
  type RevPos,
  type RevRange,
  type Rule,
  parseReversion,
} from './parser';

export function filterCommits(filter: string, commits: CommitInfo[]) {
  const expr = parseReversion(filter);
  return expressionFilter(expr, commits);
}

function expressionFilter(expr: Rule, commits: CommitInfo[]): CommitInfo[] {
  if (expr.kind === RevKind.Single) {
    return commits.filter(item => {
      let hash = expr.data.slice(0, 6);
      if (expr.data === 'HEAD') {
        hash = commits[0].oid.slice(0, 6);
      }

      if (expr.isExclude) {
        return item.oid.slice(0, 6) !== hash;
      }
      return item.oid.slice(0, 6) === hash;
    });
  }

  if (expr.kind === RevKind.Since) {
    return commits.filter(item => {
      if (expr.data.isBefore) {
        return item.time <= expr.data.data;
      }
      return item.time >= expr.data.data;
    });
  }

  if (expr.kind === RevKind.Until) {
    return commits.filter(item => {
      if (expr.data.isBefore) {
        return item.time >= expr.data.data;
      }
      return item.time <= expr.data.data;
    });
  }

  if (expr.kind === RevKind.Skip) {
    return commits.slice(expr.data);
  }
  if (expr.kind === RevKind.Author) {
    return commits.filter(item => {
      return item.author.name.includes(expr.data);
    });
  }
  if (expr.kind === RevKind.Commiter) {
    return commits.filter(item => {
      return item.commiter.name.includes(expr.data);
    });
  }
  if (expr.kind === RevKind.Grep) {
    return commits.filter(item => {
      const pat = new RegExp(expr.data);
      return pat.test(item.message);
    });
  }
  if (expr.kind === RevKind.RevMulti) {
    const arr = expr.rules.flatMap(expr => {
      return expressionFilter(expr, commits);
    });
    const map = new Map<string, CommitInfo>();
    arr.forEach(item => {
      map.set(item.oid, item);
    });
    return Array.from(map.values()).sort((a, b) => {
      return b.commiter.time - a.commiter.time;
    });
  }
  if (expr.kind === RevKind.SkipGrep) {
    const commit = commits.slice(expr.skip);
    return commit.filter(item => {
      if (!expr.grep) {
        return true;
      }
      const pat = new RegExp(expr.grep);
      return pat.test(item.message);
    });
  }
  if (expr.kind === RevKind.SkipPos) {
    let pos = commits.findIndex(item => {
      return item.oid.slice(0, 6) === expr.rev.data.slice(0, 6);
    });
    if (expr.rev.data === 'HEAD') {
      pos = 0;
    }
    if (pos === -1) {
      return [];
    }
    return commits.slice(pos + expr.skip);
  }
  if (expr.kind === RevKind.Text) {
    return commits.filter(item => {
      item.message.includes(expr.data);
    });
  }
  if (expr.kind === RevKind.RevRange) {
    return filterRevRange(expr, commits);
  }

  if (expr.kind === RevKind.Pos) {
    return filterByPos(expr, commits);
  }

  return [];
}

function filterRevRange(expr: RevRange, commits: CommitInfo[]): CommitInfo[] {
  let commit = commits;
  if (expr.starts) {
    const starts = expr.starts;
    switch (starts.kind) {
      case RevKind.Single: {
        let startPos = commit.findIndex(item => {
          return item.oid.slice(0, 6) === starts.data.slice(0.6);
        });
        if (starts.data === 'HEAD') {
          startPos = 0;
        }
        if (startPos === -1) {
          return [];
        }
        if (expr.containStarts) {
          commit = commit.slice(startPos);
        } else {
          commit = commit.slice(startPos + 1);
        }
        break;
      }
      case RevKind.Since: {
        const startPos = commit.findIndex(
          item => item.time >= starts.data.data,
        );
        if (startPos === -1) {
          return [];
        }
        if (expr.containStarts) {
          commit = commit.slice(startPos);
        } else {
          commit = commit.slice(startPos + 1);
        }
        break;
      }
      case RevKind.Skip: {
        const startPos = starts.data;
        if (expr.containStarts) {
          commit = commit.slice(startPos);
        } else {
          commit = commit.slice(startPos + 1);
        }
        break;
      }
      default: {
        return [];
      }
    }
  }
  if (expr.ends) {
    const ends = expr.ends;
    switch (ends.kind) {
      case RevKind.Single: {
        let endPos = commit.findIndex(item => {
          return item.oid.slice(0, 6) === ends.data.slice(0.6);
        });
        if (ends.data === 'HEAD') {
          endPos = 0;
        }
        if (endPos === -1) {
          return [];
        }
        if (expr.containsEnds) {
          commit = commit.slice(0, endPos - 1 <= 0 ? 1 : endPos - 1);
        } else {
          commit = commit.slice(0, endPos);
        }
        break;
      }
      case RevKind.Since: {
        const endPos = commit.findIndex(item => item.time >= ends.data.data);
        if (endPos === -1) {
          return [];
        }
        if (expr.containsEnds) {
          commit = commit.slice(0, endPos - 1 < 0 ? 0 : endPos - 1);
        } else {
          commit = commit.slice(0, endPos);
        }
        break;
      }
      case RevKind.Skip: {
        const endPos = ends.data;
        if (expr.containsEnds) {
          commit = commit.slice(0, endPos - 1 < 0 ? 0 : endPos - 1);
        } else {
          commit = commit.slice(0, endPos);
        }
        break;
      }
      default: {
        return [];
      }
    }
  }
  return commit;
}

function filterByPos(expr: RevPos, commits: CommitInfo[]): CommitInfo[] {
  const rev = expr.rev.data.slice(0, 6);
  const posExpr = expr.data;
  let idx = commits.findIndex(item => {
    return item.oid.slice(0, 6) === rev;
  });
  if (rev === 'HEAD') {
    idx = 0;
  }
  const filtered = commits.slice(idx);

  if (posExpr.kind === PosKind.Head) {
    return filtered;
  }
  if (posExpr.kind === PosKind.Exclude) {
    return filtered.slice(1);
  }
  if (posExpr.kind === PosKind.Digit) {
    const pos = saturatingSub(idx, Math.abs(posExpr.data));
    return commits.slice(pos);
  }
  if (posExpr.kind === PosKind.Reverse) {
    return filtered.slice(0, idx);
  }
  if (posExpr.kind === PosKind.Anchor) {
    if (!posExpr.data) {
      return filtered;
    }
    const expr = posExpr.data;
    if (expr.kind === AnchorKind.Text) {
      return filtered.filter(item => {
        return item.message.includes(expr.data);
      });
    }
    if (expr.kind === AnchorKind.Digit) {
      const pos = idx + expr.data;
      if (pos < 0) {
        return commits;
      }
      return commits.slice(pos);
    }
    if (expr.kind === AnchorKind.Date) {
      return filtered.filter(item => {
        if (expr.date.isBefore) {
          return item.commiter.time <= expr.date.data;
        }
        return item.commiter.time >= expr.date.data;
      });
    }
  }
  return [];
}

export function saturatingSub(a: number, b: number) {
  return a - b < 0 ? 0 : a - b;
}
