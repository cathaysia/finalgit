import { CharStream, CommonTokenStream } from 'antlr4';
import reversionLexer from './impl/reversionLexer';
import reversionParser from './impl/reversionParser';

export function parseReversion(reversion: string) {
  const value = new CharStream(reversion);
  const lexer = new reversionLexer(value);
  const stream = new CommonTokenStream(lexer);
  const parser = new reversionParser(stream);
  const tree = parser.reversion();
  return tree.toStringTree(parser.ruleNames, parser);
}
