import { CharStream, CommonTokenStream } from 'antlr4';
import { isMatching } from 'ts-pattern';
import reversionLexer from './impl/reversionLexer';
import reversionParser, { RevSinceContext } from './impl/reversionParser';
import Visitor from './impl/reversionVisitor';

interface RevSingle {
  kind: 'rev';
  data: String;
  isExclude: boolean;
}

interface RevDate {
  data: number;
  isBefore: boolean;
}
interface SinceDate {
  kind: 'since';
  data: RevDate;
}

interface UntilDate {
  kind: 'until';
  data: RevDate;
}
interface RevSkip {
  kind: 'skip';
  data: number;
}

interface RevAuthor {
  kind: 'author';
  data: String;
}

interface RevCommiter {
  kind: 'commiter';
  data: String;
}

interface RevGrep {
  kind: 'grep';
  data: String;
}

interface RevRange {
  kind: 'revRange';
  starts: Rule | undefined;
  ends: Rule | undefined;
  containStarts: boolean;
  containsEnds: boolean;
}

interface RevMulti {
  kind: 'RevMulti';
  rules: Rule[];
}

interface RevSkipGrep {
  kind: 'SkipGrep';
  skip: number;
  grep?: string;
}

interface RevSkipPos {
  kind: 'revSkipPos';
  rev: RevSingle;
  skip: number;
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
  | RevSkipPos;

export type Filter = Rule;

function createVisitor() {
  const visitor = new Visitor<Filter>();
  visitor.visitRevSingle = ctx => {
    return visitor.visit(ctx.rev());
  };
  visitor.visitRevSince = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return { kind: 'since', data: date };
  };
  visitor.visitRefName = ctx => {
    let refname = ctx.getText();
    if (refname === '@') {
      refname = 'HEAD';
    }
    return {
      kind: 'rev',
      data: refname,
      isExclude: false,
    };
  };
  visitor.visitRefOID = ctx => {
    const oid = ctx.getText();
    return {
      kind: 'rev',
      data: oid,
      isExclude: false,
    };
  };
  visitor.visitRevExclude = ctx => {
    const v = visitor.visit(ctx.rev());
    if (!isMatching({ kind: 'rev' }, v)) {
      throw new Error('bad kind');
    }
    v.isExclude = !v.isExclude;
    return v;
  };
  visitor.visitRevUntil = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return {
      kind: 'until',
      data: date,
    };
  };
  visitor.visitRevAfter = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return {
      kind: 'since',
      data: date,
    };
  };
  visitor.visitRevBefore = ctx => {
    const date = visitor.visit(ctx.date()) as any as RevDate;
    return {
      kind: 'until',
      data: date,
    };
  };
  visitor.visitRevSkip = ctx => {
    return {
      kind: 'skip',
      data: Number(ctx.DIGIT().getText()),
    };
  };
  visitor.visitRevAuthor = ctx => {
    const name = ctx
      .ANY_list()
      .map(item => item.getText())
      .join();
    return {
      kind: 'author',
      data: name,
    };
  };
  visitor.visitRevCommiter = ctx => {
    const name = ctx
      .ANY_list()
      .map(item => item.getText())
      .join();
    return {
      kind: 'commiter',
      data: name,
    };
  };
  visitor.visitRevGrep = ctx => {
    const name = ctx
      .ANY_list()
      .map(item => item.getText())
      .join();
    return {
      kind: 'grep',
      data: name,
    };
  };

  // parse date
  visitor.visitDateToday = ctx => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.getTime() as any;
  };
  visitor.visitDateYesterday = ctx => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const yesterday = date.getTime() - 24 * 60 * 60;
    return yesterday as any;
  };
  visitor.visitIso_8601 = ctx => {
    const date = new Date(ctx.getText());

    return date.getTime() as any;
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
    const times = ctx
      .time_point_list()
      .map(item => {
        const v = visitor.visit(item) as any as number;
        return v;
      })
      .reduce((pre, cur) => pre + cur);

    const isBefore = ctx.TIME_DIRECTION().getText() === 'ago';

    return {
      date: times,
      isBefore: isBefore,
    } as any;
  };

  visitor.visitRevRangeAfter1 = ctx => {
    return {
      kind: 'revRange',
      starts: visitor.visit(ctx.rules()),
      ends: undefined,
      containStarts: false,
      containsEnds: true,
    };
  };
  visitor.visitRevRangeAfter2 = ctx => {
    return {
      kind: 'revRange',
      starts: visitor.visit(ctx.rules()),
      ends: undefined,
      containStarts: true,
      containsEnds: true,
    };
  };
  visitor.visitRevRangeBefore1 = ctx => {
    return {
      kind: 'revRange',
      starts: undefined,
      ends: visitor.visit(ctx.rules()),
      containStarts: false,
      containsEnds: true,
    };
  };
  visitor.visitRevRangeAfter2 = ctx => {
    return {
      kind: 'revRange',
      starts: undefined,
      ends: visitor.visit(ctx.rules()),
      containStarts: true,
      containsEnds: true,
    };
  };
  visitor.visitRevRange1 = ctx => {
    return {
      kind: 'revRange',
      starts: visitor.visit(ctx.rules_list()[0]),
      ends: visitor.visit(ctx.rules_list()[1]),
      containStarts: false,
      containsEnds: true,
    };
  };
  visitor.visitRevRange2 = ctx => {
    return {
      kind: 'revRange',
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
      kind: 'RevMulti',
      rules: rules,
    };
  };

  visitor.visitExprText = ctx => {
    const text = ctx.getText().replace(':/', '');
    return {
      kind: 'grep',
      data: text,
    };
  };
  visitor.visitExprDigitText = ctx => {
    const skip = Number(ctx.DIGIT().getText());
    const text = ctx
      .ANY_list()
      .map(item => item.getText())
      .join();

    return {
      kind: 'SkipGrep',
      skip: skip,
      grep: text,
    };
  };
  visitor.visitExprDigit = ctx => {
    const rev = visitor.visit(ctx.rev());
    const skip = Number(ctx.DIGIT());
    if (!isMatching({ kind: 'rev' }, rev)) {
      throw new Error('bad rev');
    }
    return {
      kind: 'revSkipPos',
      rev: rev,
      skip: skip,
    };
  };
  // visitor.visitExprPos = ctx => {
  //   const rev = visitor.visit(ctx.rev());
  //   const skip = Number(ctx.DIGIT());
  //   if (!isMatching({ kind: 'rev' }, rev)) {
  //     throw new Error('bad rev');
  //   }
  //   return {
  //     kind: 'revSkipPos',
  //     rev: rev,
  //     skip: skip,
  //   };
  // };
  visitor.visitReversion = ctx => {
    return visitor.visit(ctx.rules());
  };
  return visitor;
}

export function parseReversion(reversion: string) {
  const value = new CharStream(reversion);
  const lexer = new reversionLexer(value);
  const stream = new CommonTokenStream(lexer);
  const parser = new reversionParser(stream);
  const tree = parser.reversion();
  const visitor = createVisitor();
  const result = visitor.visit(tree);

  return result;
}
