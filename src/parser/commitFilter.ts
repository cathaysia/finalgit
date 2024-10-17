import { CommitInfo } from '@/bindings';
import {
  AnchorKind,
  PosExpr,
  PosKind,
  RevKind,
  RevPos,
  RevRange,
  Rule,
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
        return item.time < expr.data.data;
      }
      return item.time > expr.data.data;
    });
  }

  if (expr.kind === RevKind.Until) {
    return commits.filter(item => {
      if (expr.data.isBefore) {
        return item.time > expr.data.data;
      }
      return item.time < expr.data.data;
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
    return expr.rules.flatMap(expr => {
      return expressionFilter(expr, commits);
    });
  }
  if (expr.kind === RevKind.SkipGrep) {
    const commit = commits.slice(expr.skip);
    return commits.filter(item => {
      if (!expr.grep) {
        return true;
      }
      const pat = new RegExp(expr.grep);
      return pat.test(item.message);
    });
  }
  if (expr.kind === RevKind.SkipPos) {
    const pos = commits.findIndex(item => {
      return item.oid.slice(0, 6) === expr.rev.data.slice(0, 6);
    });
    if (pos == -1) {
      return [];
    }
    return commits.slice(pos + expr.skip);
  }
  if (expr.kind == RevKind.Text) {
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
  return [];
}

function filterByPos(expr: RevPos, commits: CommitInfo[]): CommitInfo[] {
  const rev = expr.rev.data.slice(0, 6);
  const posExpr = expr.data;
  const idx = commits.findIndex(item => {
    item.oid.slice(0, 6) === rev;
  });
  const filtered = commits.slice(idx);

  if (posExpr.kind === PosKind.Head) {
    return filtered.slice(0, 1);
  }
  if (posExpr.kind === PosKind.Exclude) {
    return filtered.filter(item => {
      item.oid.slice(0, 6) !== rev;
    });
  }
  if (posExpr.kind === PosKind.Digit) {
    return commits.slice(idx + posExpr.kind);
  }
  if (posExpr.kind === PosKind.Reverse) {
    return commits.slice(0, idx);
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
      return commits.slice(idx + expr.data);
    }
    if (expr.kind === AnchorKind.Date) {
      return filtered.filter(item => {
        expr.date.data < item.time;
      });
    }
  }
  return [];
}
