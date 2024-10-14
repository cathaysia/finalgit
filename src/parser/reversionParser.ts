// @ts-nocheck
// Generated from reversion.g4 by ANTLR 4.13.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
  ATN,
  ATNDeserializer,
  BailErrorStrategy,
  DFA,
  DecisionState,
  FailedPredicateException,
  Interval,
  IntervalSet,
  NoViableAltException,
  Parser,
  ParserATNSimulator,
  ParserRuleContext,
  PredictionContextCache,
  PredictionMode,
  RecognitionException,
  RuleContext,
  RuleNode,
  TerminalNode,
  Token,
  TokenStream,
} from 'antlr4';
import reversionListener from './reversionListener.js';
import reversionVisitor from './reversionVisitor.js';

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class reversionParser extends Parser {
  public static readonly T__0 = 1;
  public static readonly T__1 = 2;
  public static readonly T__2 = 3;
  public static readonly T__3 = 4;
  public static readonly T__4 = 5;
  public static readonly T__5 = 6;
  public static readonly T__6 = 7;
  public static readonly T__7 = 8;
  public static readonly T__8 = 9;
  public static readonly T__9 = 10;
  public static readonly T__10 = 11;
  public static readonly T__11 = 12;
  public static readonly T__12 = 13;
  public static readonly T__13 = 14;
  public static readonly T__14 = 15;
  public static readonly DATE = 16;
  public static readonly TIME = 17;
  public static readonly DIGIT = 18;
  public static readonly OID = 19;
  public static readonly TAG = 20;
  public static readonly WS = 21;
  public static readonly EOF = Token.EOF;
  public static readonly RULE_reversion = 0;
  public static readonly RULE_starts = 1;
  public static readonly RULE_sep = 2;
  public static readonly RULE_offset = 3;
  public static readonly RULE_date = 4;
  public static readonly RULE_iso = 5;
  public static readonly RULE_relative_date = 6;
  public static readonly RULE_precise_date = 7;
  public static readonly RULE_time_unit = 8;
  public static readonly RULE_time_direction = 9;
  public static readonly literalNames: (string | null)[] = [
    null,
    "'HEAD'",
    "'@'",
    "'~'",
    "'^'",
    "'{'",
    "'}'",
    "'yesterday'",
    "' '",
    "'seconds'",
    "'minutes'",
    "'hours'",
    "'days'",
    "'years'",
    "'ago'",
    "'after'",
  ];
  public static readonly symbolicNames: (string | null)[] = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    'DATE',
    'TIME',
    'DIGIT',
    'OID',
    'TAG',
    'WS',
  ];
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'reversion',
    'starts',
    'sep',
    'offset',
    'date',
    'iso',
    'relative_date',
    'precise_date',
    'time_unit',
    'time_direction',
  ];
  public get grammarFileName(): string {
    return 'reversion.g4';
  }
  public get literalNames(): (string | null)[] {
    return reversionParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return reversionParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return reversionParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return reversionParser._serializedATN;
  }

  protected createFailedPredicateException(
    predicate?: string,
    message?: string,
  ): FailedPredicateException {
    return new FailedPredicateException(this, predicate, message);
  }

  constructor(input: TokenStream) {
    super(input);
    this._interp = new ParserATNSimulator(
      this,
      reversionParser._ATN,
      reversionParser.DecisionsToDFA,
      new PredictionContextCache(),
    );
  }
  // @RuleVersion(0)
  public reversion(): ReversionContext {
    let localctx: ReversionContext = new ReversionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 0, reversionParser.RULE_reversion);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 20;
        this.starts();
        this.state = 21;
        this.sep();
        this.state = 22;
        this.offset();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public starts(): StartsContext {
    let localctx: StartsContext = new StartsContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 2, reversionParser.RULE_starts);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 24;
        _la = this._input.LA(1);
        if (!((_la & ~0x1f) === 0 && ((1 << _la) & 1572870) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public sep(): SepContext {
    let localctx: SepContext = new SepContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, reversionParser.RULE_sep);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 26;
        _la = this._input.LA(1);
        if (!(_la === 3 || _la === 4)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public offset(): OffsetContext {
    let localctx: OffsetContext = new OffsetContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 6, reversionParser.RULE_offset);
    try {
      this.state = 33;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 18:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 28;
            this.match(reversionParser.DIGIT);
          }
          break;
        case 5:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 29;
            this.match(reversionParser.T__4);
            this.state = 30;
            this.date();
            this.state = 31;
            this.match(reversionParser.T__5);
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public date(): DateContext {
    let localctx: DateContext = new DateContext(this, this._ctx, this.state);
    this.enterRule(localctx, 8, reversionParser.RULE_date);
    try {
      this.state = 38;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 7:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 35;
            this.match(reversionParser.T__6);
          }
          break;
        case 16:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 36;
            this.iso();
          }
          break;
        case 18:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 37;
            this.relative_date();
          }
          break;
        default:
          throw new NoViableAltException(this);
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public iso(): IsoContext {
    let localctx: IsoContext = new IsoContext(this, this._ctx, this.state);
    this.enterRule(localctx, 10, reversionParser.RULE_iso);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 40;
        this.match(reversionParser.DATE);
        this.state = 42;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 17) {
          {
            this.state = 41;
            this.match(reversionParser.TIME);
          }
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public relative_date(): Relative_dateContext {
    let localctx: Relative_dateContext = new Relative_dateContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 12, reversionParser.RULE_relative_date);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 44;
        this.precise_date(0);
        this.state = 45;
        this.match(reversionParser.T__7);
        this.state = 46;
        this.time_direction();
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }

  public precise_date(): Precise_dateContext;
  public precise_date(_p: number): Precise_dateContext;
  // @RuleVersion(0)
  public precise_date(_p?: number): Precise_dateContext {
    if (_p === undefined) {
      _p = 0;
    }

    let _parentctx: ParserRuleContext = this._ctx;
    let _parentState: number = this.state;
    let localctx: Precise_dateContext = new Precise_dateContext(
      this,
      this._ctx,
      _parentState,
    );
    let _prevctx: Precise_dateContext = localctx;
    let _startState: number = 14;
    this.enterRecursionRule(
      localctx,
      14,
      reversionParser.RULE_precise_date,
      _p,
    );
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        {
          this.state = 49;
          this.match(reversionParser.DIGIT);
          this.state = 50;
          this.match(reversionParser.T__7);
          this.state = 51;
          this.time_unit();
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 58;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = localctx;
            {
              {
                localctx = new Precise_dateContext(
                  this,
                  _parentctx,
                  _parentState,
                );
                this.pushNewRecursionContext(
                  localctx,
                  _startState,
                  reversionParser.RULE_precise_date,
                );
                this.state = 53;
                if (!this.precpred(this._ctx, 1)) {
                  throw this.createFailedPredicateException(
                    'this.precpred(this._ctx, 1)',
                  );
                }
                this.state = 54;
                this.match(reversionParser.T__7);
                this.state = 55;
                this.precise_date(2);
              }
            }
          }
          this.state = 60;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 3, this._ctx);
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(_parentctx);
    }
    return localctx;
  }
  // @RuleVersion(0)
  public time_unit(): Time_unitContext {
    let localctx: Time_unitContext = new Time_unitContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 16, reversionParser.RULE_time_unit);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 61;
        _la = this._input.LA(1);
        if (!((_la & ~0x1f) === 0 && ((1 << _la) & 15872) !== 0)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }
  // @RuleVersion(0)
  public time_direction(): Time_directionContext {
    let localctx: Time_directionContext = new Time_directionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 18, reversionParser.RULE_time_direction);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 63;
        _la = this._input.LA(1);
        if (!(_la === 14 || _la === 15)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
      }
    } catch (re) {
      if (re instanceof RecognitionException) {
        localctx.exception = re;
        this._errHandler.reportError(this, re);
        this._errHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.exitRule();
    }
    return localctx;
  }

  public sempred(
    localctx: RuleContext,
    ruleIndex: number,
    predIndex: number,
  ): boolean {
    switch (ruleIndex) {
      case 7:
        return this.precise_date_sempred(
          localctx as Precise_dateContext,
          predIndex,
        );
    }
    return true;
  }
  private precise_date_sempred(
    localctx: Precise_dateContext,
    predIndex: number,
  ): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 1);
    }
    return true;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 21, 66, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4, 2,
    5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 1, 0, 1, 0, 1, 0,
    1, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 3, 3, 34, 8, 3,
    1, 4, 1, 4, 1, 4, 3, 4, 39, 8, 4, 1, 5, 1, 5, 3, 5, 43, 8, 5, 1, 6, 1, 6, 1,
    6, 1, 6, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 5, 7, 57, 8, 7, 10,
    7, 12, 7, 60, 9, 7, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 0, 1, 14, 10, 0, 2, 4, 6,
    8, 10, 12, 14, 16, 18, 0, 4, 2, 0, 1, 2, 19, 20, 1, 0, 3, 4, 1, 0, 9, 13, 1,
    0, 14, 15, 60, 0, 20, 1, 0, 0, 0, 2, 24, 1, 0, 0, 0, 4, 26, 1, 0, 0, 0, 6,
    33, 1, 0, 0, 0, 8, 38, 1, 0, 0, 0, 10, 40, 1, 0, 0, 0, 12, 44, 1, 0, 0, 0,
    14, 48, 1, 0, 0, 0, 16, 61, 1, 0, 0, 0, 18, 63, 1, 0, 0, 0, 20, 21, 3, 2, 1,
    0, 21, 22, 3, 4, 2, 0, 22, 23, 3, 6, 3, 0, 23, 1, 1, 0, 0, 0, 24, 25, 7, 0,
    0, 0, 25, 3, 1, 0, 0, 0, 26, 27, 7, 1, 0, 0, 27, 5, 1, 0, 0, 0, 28, 34, 5,
    18, 0, 0, 29, 30, 5, 5, 0, 0, 30, 31, 3, 8, 4, 0, 31, 32, 5, 6, 0, 0, 32,
    34, 1, 0, 0, 0, 33, 28, 1, 0, 0, 0, 33, 29, 1, 0, 0, 0, 34, 7, 1, 0, 0, 0,
    35, 39, 5, 7, 0, 0, 36, 39, 3, 10, 5, 0, 37, 39, 3, 12, 6, 0, 38, 35, 1, 0,
    0, 0, 38, 36, 1, 0, 0, 0, 38, 37, 1, 0, 0, 0, 39, 9, 1, 0, 0, 0, 40, 42, 5,
    16, 0, 0, 41, 43, 5, 17, 0, 0, 42, 41, 1, 0, 0, 0, 42, 43, 1, 0, 0, 0, 43,
    11, 1, 0, 0, 0, 44, 45, 3, 14, 7, 0, 45, 46, 5, 8, 0, 0, 46, 47, 3, 18, 9,
    0, 47, 13, 1, 0, 0, 0, 48, 49, 6, 7, -1, 0, 49, 50, 5, 18, 0, 0, 50, 51, 5,
    8, 0, 0, 51, 52, 3, 16, 8, 0, 52, 58, 1, 0, 0, 0, 53, 54, 10, 1, 0, 0, 54,
    55, 5, 8, 0, 0, 55, 57, 3, 14, 7, 2, 56, 53, 1, 0, 0, 0, 57, 60, 1, 0, 0, 0,
    58, 56, 1, 0, 0, 0, 58, 59, 1, 0, 0, 0, 59, 15, 1, 0, 0, 0, 60, 58, 1, 0, 0,
    0, 61, 62, 7, 2, 0, 0, 62, 17, 1, 0, 0, 0, 63, 64, 7, 3, 0, 0, 64, 19, 1, 0,
    0, 0, 4, 33, 38, 42, 58,
  ];

  private static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!reversionParser.__ATN) {
      reversionParser.__ATN = new ATNDeserializer().deserialize(
        reversionParser._serializedATN,
      );
    }

    return reversionParser.__ATN;
  }

  static DecisionsToDFA = reversionParser._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index),
  );
}

export class ReversionContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public starts(): StartsContext {
    return this.getTypedRuleContext(StartsContext, 0) as StartsContext;
  }
  public sep(): SepContext {
    return this.getTypedRuleContext(SepContext, 0) as SepContext;
  }
  public offset(): OffsetContext {
    return this.getTypedRuleContext(OffsetContext, 0) as OffsetContext;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_reversion;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterReversion) {
      listener.enterReversion(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitReversion) {
      listener.exitReversion(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitReversion) {
      return visitor.visitReversion(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class StartsContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public OID(): TerminalNode {
    return this.getToken(reversionParser.OID, 0);
  }
  public TAG(): TerminalNode {
    return this.getToken(reversionParser.TAG, 0);
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_starts;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterStarts) {
      listener.enterStarts(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitStarts) {
      listener.exitStarts(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitStarts) {
      return visitor.visitStarts(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class SepContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_sep;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterSep) {
      listener.enterSep(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitSep) {
      listener.exitSep(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitSep) {
      return visitor.visitSep(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class OffsetContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_offset;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterOffset) {
      listener.enterOffset(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitOffset) {
      listener.exitOffset(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitOffset) {
      return visitor.visitOffset(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class DateContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public iso(): IsoContext {
    return this.getTypedRuleContext(IsoContext, 0) as IsoContext;
  }
  public relative_date(): Relative_dateContext {
    return this.getTypedRuleContext(
      Relative_dateContext,
      0,
    ) as Relative_dateContext;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_date;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterDate) {
      listener.enterDate(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitDate) {
      listener.exitDate(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitDate) {
      return visitor.visitDate(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class IsoContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public DATE(): TerminalNode {
    return this.getToken(reversionParser.DATE, 0);
  }
  public TIME(): TerminalNode {
    return this.getToken(reversionParser.TIME, 0);
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_iso;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterIso) {
      listener.enterIso(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitIso) {
      listener.exitIso(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitIso) {
      return visitor.visitIso(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Relative_dateContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public precise_date(): Precise_dateContext {
    return this.getTypedRuleContext(
      Precise_dateContext,
      0,
    ) as Precise_dateContext;
  }
  public time_direction(): Time_directionContext {
    return this.getTypedRuleContext(
      Time_directionContext,
      0,
    ) as Time_directionContext;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_relative_date;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRelative_date) {
      listener.enterRelative_date(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRelative_date) {
      listener.exitRelative_date(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRelative_date) {
      return visitor.visitRelative_date(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Precise_dateContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public time_unit(): Time_unitContext {
    return this.getTypedRuleContext(Time_unitContext, 0) as Time_unitContext;
  }
  public precise_date_list(): Precise_dateContext[] {
    return this.getTypedRuleContexts(
      Precise_dateContext,
    ) as Precise_dateContext[];
  }
  public precise_date(i: number): Precise_dateContext {
    return this.getTypedRuleContext(
      Precise_dateContext,
      i,
    ) as Precise_dateContext;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_precise_date;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterPrecise_date) {
      listener.enterPrecise_date(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitPrecise_date) {
      listener.exitPrecise_date(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitPrecise_date) {
      return visitor.visitPrecise_date(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Time_unitContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_time_unit;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterTime_unit) {
      listener.enterTime_unit(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitTime_unit) {
      listener.exitTime_unit(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitTime_unit) {
      return visitor.visitTime_unit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Time_directionContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_time_direction;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterTime_direction) {
      listener.enterTime_direction(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitTime_direction) {
      listener.exitTime_direction(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitTime_direction) {
      return visitor.visitTime_direction(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
