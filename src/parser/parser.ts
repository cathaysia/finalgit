import { CharStream, CommonTokenStream } from 'antlr4';
import { isMatching } from 'ts-pattern';
import reversionLexer from './impl/reversionLexer';
import reversionParser, { RevSinceContext } from './impl/reversionParser';
import Visitor from './impl/reversionVisitor';

export enum AnchorKind {
  Date,
  Digit,
  Text,
}

export interface AnchorDate {
  kind: AnchorKind.Date;
  date: RevDate;
}

export interface AnchorDigit {
  kind: AnchorKind.Digit;
  data: number;
}

export interface AnchorText {
  kind: AnchorKind.Text;
  data: string;
}

export type AnchorType = AnchorDate | AnchorDigit | AnchorText;

export enum PosKind {
  Head,
  Exclude,
  Digit,
  Reverse,
  Anchor,
}

export interface PosHead {
  kind: PosKind.Head;
}

export interface PosExclude {
  kind: PosKind.Exclude;
}

export interface PosDigit {
  kind: PosKind.Digit;
  data: number;
}

export interface PosReverse {
  kind: PosKind.Reverse;
}

export interface PosAnchor {
  kind: PosKind.Anchor;
  data?: AnchorType;
}

export type PosExpr = PosHead | PosExclude | PosDigit | PosReverse | PosAnchor;

export enum RevKind {
  Single = 0,
  Since = 1,
  Until = 2,
  Skip = 3,
  Author = 4,
  Commiter = 5,
  Grep = 6,
  RevRange = 7,
  RevMulti = 8,
  SkipGrep = 9,
  SkipPos = 10,
  Pos = 11,
  Text = 12,
}

export interface RevSingle {
  kind: RevKind.Single;
  data: String;
  isExclude: boolean;
}

export interface RevDate {
  data: number;
  isBefore: boolean;
}
export interface SinceDate {
  kind: RevKind.Since;
  data: RevDate;
}

export interface UntilDate {
  kind: RevKind.Until;
  data: RevDate;
}
export interface RevSkip {
  kind: RevKind.Skip;
  data: number;
}

export interface RevAuthor {
  kind: RevKind.Author;
  data: string;
}

export interface RevCommiter {
  kind: RevKind.Commiter;
  data: string;
}

export interface RevGrep {
  kind: RevKind.Grep;
  data: string;
}

export interface RevRange {
  kind: RevKind.RevRange;
  starts: Rule | undefined;
  ends: Rule | undefined;
  containStarts: boolean;
  containsEnds: boolean;
}

export interface RevMulti {
  kind: RevKind.RevMulti;
  rules: Rule[];
}

export interface RevSkipGrep {
  kind: RevKind.SkipGrep;
  skip: number;
  grep?: string;
}

export interface RevSkipPos {
  kind: RevKind.SkipPos;
  rev: RevSingle;
  skip: number;
}

export interface RevPos {
  kind: RevKind.Pos;
  rev: RevSingle;
  data: PosExpr;
}

export interface RevText {
  kind: RevKind.Text;
  data: string;
}

export type Rule =
  | RevSingle
  | SinceDate
  | UntilDate
  | RevSkip
  | RevAuthor
  | RevCommiter
  | RevGrep
  | RevRange
  | RevMulti
  | RevSkipGrep
  | RevSkipPos
  | RevPos
  | RevText;

export type Filter = Rule;

function createVisitor() {
  const visitor = new Visitor<Filter>();
  visitor.visitRevSingle = ctx => {
    return visitor.visit(ctx.rev());
  };
  visitor.visitRevSince = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return { kind: RevKind.Since, data: date };
  };
  visitor.visitRefName = ctx => {
    let refname = ctx.getText();
    if (refname === '@') {
      refname = 'HEAD';
    }
    return {
      kind: RevKind.Single,
      data: refname,
      isExclude: false,
    };
  };
  visitor.visitRefOID = ctx => {
    const oid = ctx.getText();
    return {
      kind: RevKind.Single,
      data: oid,
      isExclude: false,
    };
  };
  visitor.visitRefExclude = ctx => {
    const v = visitor.visit(ctx.rev());
    if (!isMatching({ kind: RevKind.Single }, v)) {
      throw new Error('bad kind');
    }
    v.isExclude = true;
    return v;
  };
  visitor.visitRevExclude = ctx => {
    const v = visitor.visit(ctx.rules());
    if (!isMatching({ kind: RevKind.Single }, v)) {
      throw new Error('bad kind');
    }
    return v;
  };
  visitor.visitRevUntil = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return {
      kind: RevKind.Until,
      data: date,
    };
  };
  visitor.visitRevAfter = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return {
      kind: RevKind.Since,
      data: date,
    };
  };
  visitor.visitRevBefore = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return {
      kind: RevKind.Until,
      data: date,
    };
  };
  visitor.visitRevSkip = ctx => {
    return {
      kind: RevKind.Skip,
      data: Number(ctx.DIGIT().getText()),
    };
  };
  visitor.visitRevAuthor = ctx => {
    const name = ctx
      .ANY_list()
      .map(item => item.getText())
      .join('');
    return {
      kind: RevKind.Author,
      data: name,
    };
  };
  visitor.visitRevCommiter = ctx => {
    const name = ctx
      .ANY_list()
      .map(item => item.getText())
      .join('');
    return {
      kind: RevKind.Commiter,
      data: name,
    };
  };
  visitor.visitRevGrep = ctx => {
    const name = ctx
      .ANY_list()
      .map(item => item.getText())
      .join('');
    return {
      kind: RevKind.Grep,
      data: name,
    };
  };

  // parse date
  visitor.visitDateToday = ctx => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return {
      data: date.getTime() / 1000,
      isBefore: false,
    } as any;
  };
  visitor.visitDateYesterday = ctx => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const yesterday = date.getTime() / 1000 - 24 * 60 * 60;
    return {
      data: yesterday,
      isBefore: false,
    } as any;
  };
  visitor.visitDateIso8601 = ctx => {
    return visitor.visit(ctx.getChild(0));
  };
  visitor.visitIso_8601 = ctx => {
    const date = new Date(ctx.getText());

    return {
      data: date.getTime() / 1000,
      isBefore: false,
    } as any;
  };
  // parse time unit
  visitor.visitTime_value = ctx => {
    const text = ctx.getText().toLowerCase();
    if (text === 'one') return 1 as any;
    if (text === 'two') return 2 as any;
    if (text === 'three') return 3 as any;
    if (text === 'four') return 4 as any;
    if (text === 'five') return 5 as any;
    if (text === 'six') return 6 as any;
    if (text === 'seven') return 7 as any;
    if (text === 'eight') return 8 as any;
    if (text === 'nine') return 9 as any;
    if (text === 'ten') return 10 as any;

    throw new Error('bad time value');
  };

  visitor.visitTime_unit = ctx => {
    const text = ctx.getText();
    if (text == 'second' || text == 'seconds') return 1 as any;
    if (text == 'minute' || text == 'minutes') return (1 * 60) as any;
    if (text == 'hour' || text == 'hours') return (1 * 60 * 60) as any;
    if (text == 'day' || text == 'days') return (1 * 60 * 60 * 24) as any;
    if (text == 'week' || text == 'weeks') return (1 * 60 * 60 * 24 * 7) as any;
    if (text == 'month' || text == 'months')
      return (1 * 60 * 60 * 24 * 30) as any;
    if (text == 'year' || text == 'years')
      return (1 * 60 * 60 * 24 * 365) as any;

    throw new Error('unknown time unit');
  };
  visitor.visitTimePointValue = ctx => {
    const value = visitor.visit(ctx.time_value()) as any as number;
    const unit = visitor.visit(ctx.time_unit()) as any as number;
    return (value * unit) as any;
  };

  visitor.visitTimePointDigit = ctx => {
    const value = Number(ctx.DIGIT().getText());
    const unit = visitor.visit(ctx.time_unit()) as any as number;
    return (value * unit) as any;
  };

  visitor.visitDateTimePoint = ctx => {
    let date = ctx
      .time_point_list()
      .map(item => {
        const v = visitor.visit(item) as any as number;
        return v;
      })
      .reduce((pre, cur) => pre + cur);

    const isBefore = ctx.TIME_DIRECTION().getText() === 'ago';

    return {
      date: date,
      isBefore: isBefore,
    } as any;
  };

  visitor.visitRevRangeAfter1 = ctx => {
    return {
      kind: RevKind.RevRange,
      starts: visitor.visit(ctx.rules()),
      ends: undefined,
      containStarts: false,
      containsEnds: true,
    };
  };
  visitor.visitRevRangeAfter2 = ctx => {
    return {
      kind: RevKind.RevRange,
      starts: visitor.visit(ctx.rules()),
      ends: undefined,
      containStarts: true,
      containsEnds: true,
    };
  };
  visitor.visitRevRangeBefore1 = ctx => {
    return {
      kind: RevKind.RevRange,
      starts: undefined,
      ends: visitor.visit(ctx.rules()),
      containStarts: false,
      containsEnds: true,
    };
  };
  visitor.visitRevRangeAfter2 = ctx => {
    return {
      kind: RevKind.RevRange,
      starts: undefined,
      ends: visitor.visit(ctx.rules()),
      containStarts: true,
      containsEnds: true,
    };
  };
  visitor.visitRevRange1 = ctx => {
    return {
      kind: RevKind.RevRange,
      starts: visitor.visit(ctx.rules_list()[0]),
      ends: visitor.visit(ctx.rules_list()[1]),
      containStarts: false,
      containsEnds: true,
    };
  };
  visitor.visitRevRange2 = ctx => {
    return {
      kind: RevKind.RevRange,
      starts: visitor.visit(ctx.rules_list()[0]),
      ends: visitor.visit(ctx.rules_list()[1]),
      containStarts: true,
      containsEnds: true,
    };
  };
  visitor.visitRevMulti = ctx => {
    const rules = ctx.rules_list().map(item => {
      return visitor.visit(item);
    });

    return {
      kind: RevKind.RevMulti,
      rules: rules,
    };
  };

  visitor.visitExprDigitText = ctx => {
    const skip = Number(ctx.DIGIT().getText());
    const text = ctx
      .ANY_list()
      .map(item => item.getText())
      .join('');

    return {
      kind: RevKind.SkipGrep,
      skip: skip,
      grep: text,
    };
  };
  visitor.visitExprPos = ctx => {
    const rev = visitor.visit(ctx.rev()) as any as RevSingle;
    const pos = visitor.visit(ctx.rev_position()) as any as PosExpr;

    return {
      kind: RevKind.Pos,
      rev: rev,
      data: pos,
    };
  };
  visitor.visitExprDigit = ctx => {
    const rev = visitor.visit(ctx.rev());
    const skip = Number(ctx.DIGIT());
    if (!isMatching({ kind: RevKind.Single }, rev)) {
      throw new Error('bad rev');
    }
    return {
      kind: RevKind.SkipPos,
      rev: rev,
      skip: skip,
    };
  };
  visitor.visitExprText = ctx => {
    const text = ctx.getText().replace(':/', '');
    return {
      kind: RevKind.Grep,
      data: text,
    };
  };
  visitor.visitExprRevText = ctx => {
    const text = ctx
      .ANY_list()
      .map(item => item.getText())
      .join('');
    return {
      kind: RevKind.Text,
      data: text,
    };
  };
  visitor.visitRevExpression = ctx => {
    const item = visitor.visit(ctx.getChild(0));
    console.assert(ctx.getChildCount() === 1);
    return item;
  };
  visitor.visitReversion = ctx => {
    const item = visitor.visit(ctx.rules());
    return item;
  };

  visitor.visitAnchorDate = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return {
      kind: AnchorKind.Date,
      date: date,
    } as any;
  };
  visitor.visitAnchorSignedDigit = ctx => {
    const digit = Number(ctx.SIGNED_DIGIT());

    return {
      kind: AnchorKind.Digit,
      data: digit,
    } as any;
  };
  visitor.visitAnchorDigit = ctx => {
    const digit = Number(ctx.DIGIT());

    return {
      kind: AnchorKind.Digit,
      data: digit,
    } as any;
  };
  visitor.visitAnchorText = ctx => {
    const text = ctx
      .ANY_list()
      .map(item => item.getText())
      .join('');

    return {
      kind: AnchorKind.Text,

      data: text,
    } as any;
  };
  visitor.visitAnchorIso = ctx => {
    const date = visitor.visit(ctx.getChild(0)) as any as RevDate;

    return {
      kind: AnchorKind.Date,
      date: date,
    } as any;
  };
  visitor.visitPosAnchor = ctx => {
    if (ctx.ref_anchor() === null) {
      return {
        kind: PosKind.Anchor,
        data: undefined,
      } as any;
    }
    const anchor = visitor.visit(ctx.ref_anchor());
    return {
      kind: PosKind.Anchor,
      data: anchor,
    } as any;
  };
  visitor.visitPosHead = ctx => {
    return {
      kind: PosKind.Head,
    } as any;
  };
  visitor.visitPosExclude = ctx => {
    return {
      kind: PosKind.Exclude,
    } as any;
  };
  visitor.visitPosReverse = ctx => {
    return {
      kind: PosKind.Reverse,
    } as any;
  };
  visitor.visitPosNeg = ctx => {
    const data = Number(ctx.SIGNED_DIGIT().getText());
    return {
      kind: PosKind.Reverse,
      data: data,
    } as any;
  };
  return visitor;
}

export function parseReversion(reversion: string) {
  const error = console.error;
  console.error = () => {};
  const value = new CharStream(reversion);
  const lexer = new reversionLexer(value);
  const stream = new CommonTokenStream(lexer);
  const parser = new reversionParser(stream);
  const tree = parser.reversion();
  const visitor = createVisitor();
  const result = visitor.visit(tree);
  console.error = error;

  return result;
}
