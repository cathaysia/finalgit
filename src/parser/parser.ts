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
interface SinceDate {
  kind: 'since';
  data: number;
}

interface UntilDate {
  kind: 'until';
  data: number;
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

export type Filter =
  | RevSingle
  | SinceDate
  | UntilDate
  | RevSkip
  | RevAuthor
  | RevCommiter
  | RevGrep;

function createVisitor() {
  const visitor = new Visitor<Filter>();
  visitor.visitRevSince = ctx => {
    const date = visitor.visit(ctx.date()) as any as number;
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
    const date = visitor.visit(ctx.date()) as any as number;
    return {
      kind: 'until',
      data: date,
    };
  };
  visitor.visitRevAfter = ctx => {
    const date = visitor.visit(ctx.date()) as any as number;
    return {
      kind: 'since',
      data: date,
    };
  };
  visitor.visitRevBefore = ctx => {
    const date = visitor.visit(ctx.date()) as any as number;
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

  visitor.visitToday = ctx => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.getTime() as any;
  };
  visitor.visitYesterday = ctx => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    const yesterday = date.getTime() - 24 * 60 * 60;
    return yesterday as any;
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
