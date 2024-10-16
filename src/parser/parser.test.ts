import { CharStream, CommonTokenStream } from 'antlr4';
import { expect, test } from 'vitest';
import reversionLexer from './impl/reversionLexer';
import reversionParser from './impl/reversionParser';
import { parseReversion as P } from './parser';

function parseReversion(reversion: string) {
  const value = new CharStream(reversion);
  const lexer = new reversionLexer(value);
  const stream = new CommonTokenStream(lexer);
  const parser = new reversionParser(stream);
  parser.reversion();
}

test('simple', () => {
  const oid = '0a297b';
  const OID = '0a297b7c3a5df1c9a864577f76535aca588a3bca';
  for (let i = 0; i < 1000; i += 9) {
    parseReversion(`HEAD~${i}`);
    parseReversion(`HEAD^${i}`);
    parseReversion(`@~${i}`);
    parseReversion(`@^${i}`);
    parseReversion(`0a297b7c3a5df1c9a864577f76535aca588a3bca~${i}`);
    parseReversion(`0a297b7c3a5df1c9a864577f76535aca588a3bca^${i}`);
    parseReversion(`0a297b~${i}`);
    parseReversion(`0a297b^${i}`);
  }

  const expression = [];

  const exps = [
    'HEAD~1..HEAD~10',
    'HEAD...@',
    `${oid}...${oid}~1`,
    'HEAD~1...',
    `HEAD~1..`,
    `${oid}..`,
    `..${oid}`,
    '...HEAD~1',
    `^${oid}`,
    `${oid} ${oid}`,
    `${oid}^@`,
    `${oid}^{-10}`,
    `${oid}^-10`,
    `${oid}^-`,
    'HEAD~!',
    // `v0.4^1`,
    'HEAD~{-1}',
    'HEAD~{}',
    'HEAD~{yesterday}',
    'HEAD~{2024-01-01}',
    'HEAD~{5 minutes ago}',
    'HEAD~{1 month 2 weeks 3 days 1 hour 1 second ago}',
    'HEAD~{one weeks ago}',
    'HEAD~{1979-02-26 18:30:00}',
    `${oid} ${OID}`,
    `HEAD~{} HEAD~{10}`,
    `since=yesterday`,
    `since=5 minutes ago`,
    `since=1 days 5 minutes ago`,
    `author=Bob`,
    'grep=.*',
    `:/some text`,
    `HEAD~{/text}`,
    `:10:README`,
    `HEAD:README`,
  ];

  for (const item of exps) {
    parseReversion(item);
  }
});

// test('saa', () => {
//   console.log(P('^HEAD'));
//   console.log(P('since=today'));
//   console.log(P('since=yesterday'));
// });
