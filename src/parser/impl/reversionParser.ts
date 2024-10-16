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

// @ts-ignore

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
  public static readonly T__15 = 16;
  public static readonly T__16 = 17;
  public static readonly T__17 = 18;
  public static readonly T__18 = 19;
  public static readonly T__19 = 20;
  public static readonly T__20 = 21;
  public static readonly T__21 = 22;
  public static readonly T__22 = 23;
  public static readonly T__23 = 24;
  public static readonly T__24 = 25;
  public static readonly T__25 = 26;
  public static readonly T__26 = 27;
  public static readonly T__27 = 28;
  public static readonly T__28 = 29;
  public static readonly T__29 = 30;
  public static readonly T__30 = 31;
  public static readonly T__31 = 32;
  public static readonly T__32 = 33;
  public static readonly T__33 = 34;
  public static readonly T__34 = 35;
  public static readonly T__35 = 36;
  public static readonly T__36 = 37;
  public static readonly T__37 = 38;
  public static readonly T__38 = 39;
  public static readonly T__39 = 40;
  public static readonly T__40 = 41;
  public static readonly T__41 = 42;
  public static readonly T__42 = 43;
  public static readonly T__43 = 44;
  public static readonly T__44 = 45;
  public static readonly T__45 = 46;
  public static readonly T__46 = 47;
  public static readonly T__47 = 48;
  public static readonly T__48 = 49;
  public static readonly T__49 = 50;
  public static readonly TIME_DIRECTION = 51;
  public static readonly SIGNED_DIGIT = 52;
  public static readonly DIGIT = 53;
  public static readonly OID = 54;
  public static readonly OID_SHORT = 55;
  public static readonly OID_LONG = 56;
  public static readonly ISO_DATE = 57;
  public static readonly ISO_TIME = 58;
  public static readonly IS_TIME_POSTFIX = 59;
  public static readonly SPACE = 60;
  public static readonly INT12 = 61;
  public static readonly INT2 = 62;
  public static readonly INT4 = 63;
  public static readonly ANY = 64;
  public static readonly OID_EL = 65;
  public static readonly NEWLINE = 66;
  public static readonly EOF = Token.EOF;
  public static readonly RULE_reversion = 0;
  public static readonly RULE_rules = 1;
  public static readonly RULE_rev = 2;
  public static readonly RULE_refname = 3;
  public static readonly RULE_rev_expression = 4;
  public static readonly RULE_rev_position = 5;
  public static readonly RULE_rev_direction = 6;
  public static readonly RULE_ref_anchor = 7;
  public static readonly RULE_date = 8;
  public static readonly RULE_time_point = 9;
  public static readonly RULE_time_value = 10;
  public static readonly RULE_time_unit = 11;
  public static readonly RULE_iso_8601 = 12;
  public static readonly literalNames: (string | null)[] = [
    null,
    "'since'",
    "'='",
    "'until'",
    "'after'",
    "'skip'",
    "'before'",
    "'max-age'",
    "'min-age'",
    "'author'",
    "'commiter'",
    "'grep'",
    "'..'",
    "'...'",
    "'^'",
    "'HEAD'",
    "'@'",
    "':/'",
    "':'",
    "'!'",
    "'-'",
    "'{'",
    "'}'",
    "'~'",
    "'/'",
    "'yesterday'",
    "'today'",
    "'one'",
    "'two'",
    "'three'",
    "'four'",
    "'five'",
    "'six'",
    "'seven'",
    "'eight'",
    "'nine'",
    "'ten'",
    "'second'",
    "'minute'",
    "'hour'",
    "'day'",
    "'week'",
    "'month'",
    "'year'",
    "'seconds'",
    "'minutes'",
    "'hours'",
    "'days'",
    "'weeks'",
    "'months'",
    "'years'",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "' '",
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
    null,
    null,
    null,
    'TIME_DIRECTION',
    'SIGNED_DIGIT',
    'DIGIT',
    'OID',
    'OID_SHORT',
    'OID_LONG',
    'ISO_DATE',
    'ISO_TIME',
    'IS_TIME_POSTFIX',
    'SPACE',
    'INT12',
    'INT2',
    'INT4',
    'ANY',
    'OID_EL',
    'NEWLINE',
  ];
  // tslint:disable:no-trailing-whitespace
  public static readonly ruleNames: string[] = [
    'reversion',
    'rules',
    'rev',
    'refname',
    'rev_expression',
    'rev_position',
    'rev_direction',
    'ref_anchor',
    'date',
    'time_point',
    'time_value',
    'time_unit',
    'iso_8601',
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
        this.state = 26;
        this.rules(0);
        this.state = 27;
        this.match(reversionParser.EOF);
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

  public rules(): RulesContext;
  public rules(_p: number): RulesContext;
  // @RuleVersion(0)
  public rules(_p?: number): RulesContext {
    if (_p === undefined) {
      _p = 0;
    }

    let _parentctx: ParserRuleContext = this._ctx;
    let _parentState: number = this.state;
    let localctx: RulesContext = new RulesContext(
      this,
      this._ctx,
      _parentState,
    );
    let _prevctx: RulesContext = localctx;
    let _startState: number = 2;
    this.enterRecursionRule(localctx, 2, reversionParser.RULE_rules, _p);
    try {
      let _alt: number;
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 78;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 3, this._ctx)) {
          case 1:
            {
              localctx = new RevSingleContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;

              this.state = 30;
              this.rev();
            }
            break;
          case 2:
            {
              localctx = new RevExpressionContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 31;
              this.rev_expression();
            }
            break;
          case 3:
            {
              localctx = new RevSinceContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 32;
              this.match(reversionParser.T__0);
              this.state = 33;
              this.match(reversionParser.T__1);
              this.state = 34;
              this.date();
            }
            break;
          case 4:
            {
              localctx = new RevUntilContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 35;
              this.match(reversionParser.T__2);
              this.state = 36;
              this.match(reversionParser.T__1);
              this.state = 37;
              this.date();
            }
            break;
          case 5:
            {
              localctx = new RevAfterContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 38;
              this.match(reversionParser.T__3);
              this.state = 39;
              this.match(reversionParser.T__1);
              this.state = 40;
              this.date();
            }
            break;
          case 6:
            {
              localctx = new RevSkipContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 41;
              this.match(reversionParser.T__4);
              this.state = 42;
              this.match(reversionParser.T__1);
              this.state = 43;
              this.match(reversionParser.DIGIT);
            }
            break;
          case 7:
            {
              localctx = new RevBeforeContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 44;
              this.match(reversionParser.T__5);
              this.state = 45;
              this.match(reversionParser.T__1);
              this.state = 46;
              this.date();
            }
            break;
          case 8:
            {
              localctx = new RevMaxAgeContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 47;
              this.match(reversionParser.T__6);
              this.state = 48;
              this.match(reversionParser.T__1);
              this.state = 49;
              this.date();
            }
            break;
          case 9:
            {
              localctx = new RevMinAgeContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 50;
              this.match(reversionParser.T__7);
              this.state = 51;
              this.match(reversionParser.T__1);
              this.state = 52;
              this.date();
            }
            break;
          case 10:
            {
              localctx = new RevAuthorContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 53;
              this.match(reversionParser.T__8);
              this.state = 54;
              this.match(reversionParser.T__1);
              this.state = 56;
              this._errHandler.sync(this);
              _alt = 1;
              do {
                switch (_alt) {
                  case 1:
                    {
                      {
                        this.state = 55;
                        this.match(reversionParser.ANY);
                      }
                    }
                    break;
                  default:
                    throw new NoViableAltException(this);
                }
                this.state = 58;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
              } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
            break;
          case 11:
            {
              localctx = new RevCommiterContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 60;
              this.match(reversionParser.T__9);
              this.state = 61;
              this.match(reversionParser.T__1);
              this.state = 63;
              this._errHandler.sync(this);
              _alt = 1;
              do {
                switch (_alt) {
                  case 1:
                    {
                      {
                        this.state = 62;
                        this.match(reversionParser.ANY);
                      }
                    }
                    break;
                  default:
                    throw new NoViableAltException(this);
                }
                this.state = 65;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
              } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
            break;
          case 12:
            {
              localctx = new RevGrepContext(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 67;
              this.match(reversionParser.T__10);
              this.state = 68;
              this.match(reversionParser.T__1);
              this.state = 70;
              this._errHandler.sync(this);
              _alt = 1;
              do {
                switch (_alt) {
                  case 1:
                    {
                      {
                        this.state = 69;
                        this.match(reversionParser.ANY);
                      }
                    }
                    break;
                  default:
                    throw new NoViableAltException(this);
                }
                this.state = 72;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
              } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
            break;
          case 13:
            {
              localctx = new RevRangeBefore1Context(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 74;
              this.match(reversionParser.T__11);
              this.state = 75;
              this.rules(2);
            }
            break;
          case 14:
            {
              localctx = new RevRangeBefore2Context(this, localctx);
              this._ctx = localctx;
              _prevctx = localctx;
              this.state = 76;
              this.match(reversionParser.T__12);
              this.state = 77;
              this.rules(1);
            }
            break;
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 99;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = localctx;
            {
              this.state = 97;
              this._errHandler.sync(this);
              switch (this._interp.adaptivePredict(this._input, 5, this._ctx)) {
                case 1:
                  {
                    localctx = new RevRange1Context(
                      this,
                      new RulesContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 80;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 4)',
                      );
                    }
                    this.state = 81;
                    this.match(reversionParser.T__11);
                    this.state = 82;
                    this.rules(5);
                  }
                  break;
                case 2:
                  {
                    localctx = new RevRange2Context(
                      this,
                      new RulesContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 83;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 3)',
                      );
                    }
                    this.state = 84;
                    this.match(reversionParser.T__12);
                    this.state = 85;
                    this.rules(4);
                  }
                  break;
                case 3:
                  {
                    localctx = new RevRangeAfter1Context(
                      this,
                      new RulesContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 86;
                    if (!this.precpred(this._ctx, 7)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 7)',
                      );
                    }
                    this.state = 87;
                    this.match(reversionParser.T__11);
                  }
                  break;
                case 4:
                  {
                    localctx = new RevRangeAfter2Context(
                      this,
                      new RulesContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 88;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 6)',
                      );
                    }
                    this.state = 89;
                    this.match(reversionParser.T__12);
                  }
                  break;
                case 5:
                  {
                    localctx = new RevMultiContext(
                      this,
                      new RulesContext(this, _parentctx, _parentState),
                    );
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 90;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 5)',
                      );
                    }
                    this.state = 93;
                    this._errHandler.sync(this);
                    _alt = 1;
                    do {
                      switch (_alt) {
                        case 1:
                          {
                            {
                              this.state = 91;
                              this.match(reversionParser.SPACE);
                              this.state = 92;
                              this.rules(0);
                            }
                          }
                          break;
                        default:
                          throw new NoViableAltException(this);
                      }
                      this.state = 95;
                      this._errHandler.sync(this);
                      _alt = this._interp.adaptivePredict(
                        this._input,
                        4,
                        this._ctx,
                      );
                    } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
                  }
                  break;
              }
            }
          }
          this.state = 101;
          this._errHandler.sync(this);
          _alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
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
  public rev(): RevContext {
    let localctx: RevContext = new RevContext(this, this._ctx, this.state);
    this.enterRule(localctx, 4, reversionParser.RULE_rev);
    try {
      this.state = 106;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 15:
        case 16:
          localctx = new RefNameContext(this, localctx);
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 102;
            this.refname();
          }
          break;
        case 54:
          localctx = new RefOIDContext(this, localctx);
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 103;
            this.match(reversionParser.OID);
          }
          break;
        case 14:
          localctx = new RevExcludeContext(this, localctx);
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 104;
            this.match(reversionParser.T__13);
            this.state = 105;
            this.rev();
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
  public refname(): RefnameContext {
    let localctx: RefnameContext = new RefnameContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 6, reversionParser.RULE_refname);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 108;
        _la = this._input.LA(1);
        if (!(_la === 15 || _la === 16)) {
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
  public rev_expression(): Rev_expressionContext {
    let localctx: Rev_expressionContext = new Rev_expressionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 8, reversionParser.RULE_rev_expression);
    let _la: number;
    try {
      let _alt: number;
      this.state = 139;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 11, this._ctx)) {
        case 1:
          localctx = new ExprPosContext(this, localctx);
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 110;
            this.rev();
            this.state = 111;
            this.rev_direction();
            this.state = 112;
            this.rev_position();
          }
          break;
        case 2:
          localctx = new ExprDigitContext(this, localctx);
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 114;
            this.rev();
            this.state = 115;
            this.rev_direction();
            this.state = 116;
            this.match(reversionParser.DIGIT);
          }
          break;
        case 3:
          localctx = new ExprTextContext(this, localctx);
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 118;
            this.match(reversionParser.T__16);
            this.state = 120;
            this._errHandler.sync(this);
            _alt = 1;
            do {
              switch (_alt) {
                case 1:
                  {
                    {
                      this.state = 119;
                      _la = this._input.LA(1);
                      if (!(_la === 60 || _la === 64)) {
                        this._errHandler.recoverInline(this);
                      } else {
                        this._errHandler.reportMatch(this);
                        this.consume();
                      }
                    }
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 122;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
            } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
          }
          break;
        case 4:
          localctx = new ExprRevTextContext(this, localctx);
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 124;
            this.rev();
            this.state = 125;
            this.match(reversionParser.T__17);
            this.state = 127;
            this._errHandler.sync(this);
            _alt = 1;
            do {
              switch (_alt) {
                case 1:
                  {
                    {
                      this.state = 126;
                      this.match(reversionParser.ANY);
                    }
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 129;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
            } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
          }
          break;
        case 5:
          localctx = new ExprDigitTextContext(this, localctx);
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 131;
            this.match(reversionParser.T__17);
            this.state = 132;
            this.match(reversionParser.DIGIT);
            this.state = 133;
            this.match(reversionParser.T__17);
            this.state = 135;
            this._errHandler.sync(this);
            _alt = 1;
            do {
              switch (_alt) {
                case 1:
                  {
                    {
                      this.state = 134;
                      this.match(reversionParser.ANY);
                    }
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 137;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 10, this._ctx);
            } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
          }
          break;
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
  public rev_position(): Rev_positionContext {
    let localctx: Rev_positionContext = new Rev_positionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 10, reversionParser.RULE_rev_position);
    let _la: number;
    try {
      this.state = 150;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 16:
          localctx = new PosHeadContext(this, localctx);
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 141;
            this.match(reversionParser.T__15);
          }
          break;
        case 19:
          localctx = new PosExcludeContext(this, localctx);
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 142;
            this.match(reversionParser.T__18);
          }
          break;
        case 52:
          localctx = new PosNegContext(this, localctx);
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 143;
            this.match(reversionParser.SIGNED_DIGIT);
          }
          break;
        case 20:
          localctx = new PosReverseContext(this, localctx);
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 144;
            this.match(reversionParser.T__19);
          }
          break;
        case 21:
          localctx = new PosAnchorContext(this, localctx);
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 145;
            this.match(reversionParser.T__20);
            this.state = 147;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la & ~0x1f) === 0 && ((1 << _la) & 4278190080) !== 0) ||
              (((_la - 32) & ~0x1f) === 0 &&
                ((1 << (_la - 32)) & 36700191) !== 0)
            ) {
              {
                this.state = 146;
                this.ref_anchor();
              }
            }

            this.state = 149;
            this.match(reversionParser.T__21);
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
  public rev_direction(): Rev_directionContext {
    let localctx: Rev_directionContext = new Rev_directionContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 12, reversionParser.RULE_rev_direction);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 152;
        _la = this._input.LA(1);
        if (!((_la & ~0x1f) === 0 && ((1 << _la) & 8470528) !== 0)) {
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
  public ref_anchor(): Ref_anchorContext {
    let localctx: Ref_anchorContext = new Ref_anchorContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 14, reversionParser.RULE_ref_anchor);
    try {
      let _alt: number;
      this.state = 164;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 15, this._ctx)) {
        case 1:
          localctx = new AnchorDateContext(this, localctx);
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 154;
            this.date();
          }
          break;
        case 2:
          localctx = new AnchorSignedDigitContext(this, localctx);
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 155;
            this.match(reversionParser.SIGNED_DIGIT);
          }
          break;
        case 3:
          localctx = new AnchorDigitContext(this, localctx);
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 156;
            this.match(reversionParser.DIGIT);
          }
          break;
        case 4:
          localctx = new AnchorTextContext(this, localctx);
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 157;
            this.match(reversionParser.T__23);
            this.state = 159;
            this._errHandler.sync(this);
            _alt = 1 + 1;
            do {
              switch (_alt) {
                case 1 + 1:
                  {
                    {
                      this.state = 158;
                      this.matchWildcard();
                    }
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 161;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 14, this._ctx);
            } while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
          }
          break;
        case 5:
          localctx = new AnchorIsoContext(this, localctx);
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 163;
            this.iso_8601();
          }
          break;
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
    this.enterRule(localctx, 16, reversionParser.RULE_date);
    try {
      let _alt: number;
      this.state = 180;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 25:
          localctx = new DateYesterdayContext(this, localctx);
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 166;
            this.match(reversionParser.T__24);
          }
          break;
        case 26:
          localctx = new DateTodayContext(this, localctx);
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 167;
            this.match(reversionParser.T__25);
          }
          break;
        case 57:
          localctx = new DateIso8601Context(this, localctx);
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 168;
            this.iso_8601();
          }
          break;
        case 27:
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 53:
          localctx = new DateTimePointContext(this, localctx);
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 169;
            this.time_point();
            this.state = 174;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 170;
                    this.match(reversionParser.SPACE);
                    this.state = 171;
                    this.time_point();
                  }
                }
              }
              this.state = 176;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
            }
            this.state = 177;
            this.match(reversionParser.SPACE);
            this.state = 178;
            this.match(reversionParser.TIME_DIRECTION);
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
  public time_point(): Time_pointContext {
    let localctx: Time_pointContext = new Time_pointContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 18, reversionParser.RULE_time_point);
    try {
      this.state = 189;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 27:
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
          localctx = new TimePointValueContext(this, localctx);
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 182;
            this.time_value();
            this.state = 183;
            this.match(reversionParser.SPACE);
            this.state = 184;
            this.time_unit();
          }
          break;
        case 53:
          localctx = new TimePointDigitContext(this, localctx);
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 186;
            this.match(reversionParser.DIGIT);
            this.state = 187;
            this.match(reversionParser.SPACE);
            this.state = 188;
            this.time_unit();
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
  public time_value(): Time_valueContext {
    let localctx: Time_valueContext = new Time_valueContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 20, reversionParser.RULE_time_value);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 191;
        _la = this._input.LA(1);
        if (!(((_la - 27) & ~0x1f) === 0 && ((1 << (_la - 27)) & 1023) !== 0)) {
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
  public time_unit(): Time_unitContext {
    let localctx: Time_unitContext = new Time_unitContext(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 22, reversionParser.RULE_time_unit);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 193;
        _la = this._input.LA(1);
        if (
          !(((_la - 37) & ~0x1f) === 0 && ((1 << (_la - 37)) & 16383) !== 0)
        ) {
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
  public iso_8601(): Iso_8601Context {
    let localctx: Iso_8601Context = new Iso_8601Context(
      this,
      this._ctx,
      this.state,
    );
    this.enterRule(localctx, 24, reversionParser.RULE_iso_8601);
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 195;
        this.match(reversionParser.ISO_DATE);
        this.state = 201;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 20, this._ctx)) {
          case 1:
            {
              this.state = 196;
              this.match(reversionParser.SPACE);
              this.state = 197;
              this.match(reversionParser.ISO_TIME);
              this.state = 199;
              this._errHandler.sync(this);
              switch (
                this._interp.adaptivePredict(this._input, 19, this._ctx)
              ) {
                case 1:
                  {
                    this.state = 198;
                    this.match(reversionParser.IS_TIME_POSTFIX);
                  }
                  break;
              }
            }
            break;
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
      case 1:
        return this.rules_sempred(localctx as RulesContext, predIndex);
    }
    return true;
  }
  private rules_sempred(localctx: RulesContext, predIndex: number): boolean {
    switch (predIndex) {
      case 0:
        return this.precpred(this._ctx, 4);
      case 1:
        return this.precpred(this._ctx, 3);
      case 2:
        return this.precpred(this._ctx, 7);
      case 3:
        return this.precpred(this._ctx, 6);
      case 4:
        return this.precpred(this._ctx, 5);
    }
    return true;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 66, 204, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4,
    2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 2,
    11, 7, 11, 2, 12, 7, 12, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 57, 8, 1, 11, 1,
    12, 1, 58, 1, 1, 1, 1, 1, 1, 4, 1, 64, 8, 1, 11, 1, 12, 1, 65, 1, 1, 1, 1,
    1, 1, 4, 1, 71, 8, 1, 11, 1, 12, 1, 72, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 79, 8,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 4, 1, 94, 8, 1, 11, 1, 12, 1, 95, 5, 1, 98, 8, 1, 10, 1, 12, 1, 101,
    9, 1, 1, 2, 1, 2, 1, 2, 1, 2, 3, 2, 107, 8, 2, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4,
    1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 121, 8, 4, 11, 4, 12, 4,
    122, 1, 4, 1, 4, 1, 4, 4, 4, 128, 8, 4, 11, 4, 12, 4, 129, 1, 4, 1, 4, 1, 4,
    1, 4, 4, 4, 136, 8, 4, 11, 4, 12, 4, 137, 3, 4, 140, 8, 4, 1, 5, 1, 5, 1, 5,
    1, 5, 1, 5, 1, 5, 3, 5, 148, 8, 5, 1, 5, 3, 5, 151, 8, 5, 1, 6, 1, 6, 1, 7,
    1, 7, 1, 7, 1, 7, 1, 7, 4, 7, 160, 8, 7, 11, 7, 12, 7, 161, 1, 7, 3, 7, 165,
    8, 7, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 5, 8, 173, 8, 8, 10, 8, 12, 8,
    176, 9, 8, 1, 8, 1, 8, 1, 8, 3, 8, 181, 8, 8, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9,
    1, 9, 1, 9, 3, 9, 190, 8, 9, 1, 10, 1, 10, 1, 11, 1, 11, 1, 12, 1, 12, 1,
    12, 1, 12, 3, 12, 200, 8, 12, 3, 12, 202, 8, 12, 1, 12, 1, 161, 1, 2, 13, 0,
    2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 0, 5, 1, 0, 15, 16, 2, 0, 60,
    60, 64, 64, 3, 0, 14, 14, 16, 16, 23, 23, 1, 0, 27, 36, 1, 0, 37, 50, 238,
    0, 26, 1, 0, 0, 0, 2, 78, 1, 0, 0, 0, 4, 106, 1, 0, 0, 0, 6, 108, 1, 0, 0,
    0, 8, 139, 1, 0, 0, 0, 10, 150, 1, 0, 0, 0, 12, 152, 1, 0, 0, 0, 14, 164, 1,
    0, 0, 0, 16, 180, 1, 0, 0, 0, 18, 189, 1, 0, 0, 0, 20, 191, 1, 0, 0, 0, 22,
    193, 1, 0, 0, 0, 24, 195, 1, 0, 0, 0, 26, 27, 3, 2, 1, 0, 27, 28, 5, 0, 0,
    1, 28, 1, 1, 0, 0, 0, 29, 30, 6, 1, -1, 0, 30, 79, 3, 4, 2, 0, 31, 79, 3, 8,
    4, 0, 32, 33, 5, 1, 0, 0, 33, 34, 5, 2, 0, 0, 34, 79, 3, 16, 8, 0, 35, 36,
    5, 3, 0, 0, 36, 37, 5, 2, 0, 0, 37, 79, 3, 16, 8, 0, 38, 39, 5, 4, 0, 0, 39,
    40, 5, 2, 0, 0, 40, 79, 3, 16, 8, 0, 41, 42, 5, 5, 0, 0, 42, 43, 5, 2, 0, 0,
    43, 79, 5, 53, 0, 0, 44, 45, 5, 6, 0, 0, 45, 46, 5, 2, 0, 0, 46, 79, 3, 16,
    8, 0, 47, 48, 5, 7, 0, 0, 48, 49, 5, 2, 0, 0, 49, 79, 3, 16, 8, 0, 50, 51,
    5, 8, 0, 0, 51, 52, 5, 2, 0, 0, 52, 79, 3, 16, 8, 0, 53, 54, 5, 9, 0, 0, 54,
    56, 5, 2, 0, 0, 55, 57, 5, 64, 0, 0, 56, 55, 1, 0, 0, 0, 57, 58, 1, 0, 0, 0,
    58, 56, 1, 0, 0, 0, 58, 59, 1, 0, 0, 0, 59, 79, 1, 0, 0, 0, 60, 61, 5, 10,
    0, 0, 61, 63, 5, 2, 0, 0, 62, 64, 5, 64, 0, 0, 63, 62, 1, 0, 0, 0, 64, 65,
    1, 0, 0, 0, 65, 63, 1, 0, 0, 0, 65, 66, 1, 0, 0, 0, 66, 79, 1, 0, 0, 0, 67,
    68, 5, 11, 0, 0, 68, 70, 5, 2, 0, 0, 69, 71, 5, 64, 0, 0, 70, 69, 1, 0, 0,
    0, 71, 72, 1, 0, 0, 0, 72, 70, 1, 0, 0, 0, 72, 73, 1, 0, 0, 0, 73, 79, 1, 0,
    0, 0, 74, 75, 5, 12, 0, 0, 75, 79, 3, 2, 1, 2, 76, 77, 5, 13, 0, 0, 77, 79,
    3, 2, 1, 1, 78, 29, 1, 0, 0, 0, 78, 31, 1, 0, 0, 0, 78, 32, 1, 0, 0, 0, 78,
    35, 1, 0, 0, 0, 78, 38, 1, 0, 0, 0, 78, 41, 1, 0, 0, 0, 78, 44, 1, 0, 0, 0,
    78, 47, 1, 0, 0, 0, 78, 50, 1, 0, 0, 0, 78, 53, 1, 0, 0, 0, 78, 60, 1, 0, 0,
    0, 78, 67, 1, 0, 0, 0, 78, 74, 1, 0, 0, 0, 78, 76, 1, 0, 0, 0, 79, 99, 1, 0,
    0, 0, 80, 81, 10, 4, 0, 0, 81, 82, 5, 12, 0, 0, 82, 98, 3, 2, 1, 5, 83, 84,
    10, 3, 0, 0, 84, 85, 5, 13, 0, 0, 85, 98, 3, 2, 1, 4, 86, 87, 10, 7, 0, 0,
    87, 98, 5, 12, 0, 0, 88, 89, 10, 6, 0, 0, 89, 98, 5, 13, 0, 0, 90, 93, 10,
    5, 0, 0, 91, 92, 5, 60, 0, 0, 92, 94, 3, 2, 1, 0, 93, 91, 1, 0, 0, 0, 94,
    95, 1, 0, 0, 0, 95, 93, 1, 0, 0, 0, 95, 96, 1, 0, 0, 0, 96, 98, 1, 0, 0, 0,
    97, 80, 1, 0, 0, 0, 97, 83, 1, 0, 0, 0, 97, 86, 1, 0, 0, 0, 97, 88, 1, 0, 0,
    0, 97, 90, 1, 0, 0, 0, 98, 101, 1, 0, 0, 0, 99, 97, 1, 0, 0, 0, 99, 100, 1,
    0, 0, 0, 100, 3, 1, 0, 0, 0, 101, 99, 1, 0, 0, 0, 102, 107, 3, 6, 3, 0, 103,
    107, 5, 54, 0, 0, 104, 105, 5, 14, 0, 0, 105, 107, 3, 4, 2, 0, 106, 102, 1,
    0, 0, 0, 106, 103, 1, 0, 0, 0, 106, 104, 1, 0, 0, 0, 107, 5, 1, 0, 0, 0,
    108, 109, 7, 0, 0, 0, 109, 7, 1, 0, 0, 0, 110, 111, 3, 4, 2, 0, 111, 112, 3,
    12, 6, 0, 112, 113, 3, 10, 5, 0, 113, 140, 1, 0, 0, 0, 114, 115, 3, 4, 2, 0,
    115, 116, 3, 12, 6, 0, 116, 117, 5, 53, 0, 0, 117, 140, 1, 0, 0, 0, 118,
    120, 5, 17, 0, 0, 119, 121, 7, 1, 0, 0, 120, 119, 1, 0, 0, 0, 121, 122, 1,
    0, 0, 0, 122, 120, 1, 0, 0, 0, 122, 123, 1, 0, 0, 0, 123, 140, 1, 0, 0, 0,
    124, 125, 3, 4, 2, 0, 125, 127, 5, 18, 0, 0, 126, 128, 5, 64, 0, 0, 127,
    126, 1, 0, 0, 0, 128, 129, 1, 0, 0, 0, 129, 127, 1, 0, 0, 0, 129, 130, 1, 0,
    0, 0, 130, 140, 1, 0, 0, 0, 131, 132, 5, 18, 0, 0, 132, 133, 5, 53, 0, 0,
    133, 135, 5, 18, 0, 0, 134, 136, 5, 64, 0, 0, 135, 134, 1, 0, 0, 0, 136,
    137, 1, 0, 0, 0, 137, 135, 1, 0, 0, 0, 137, 138, 1, 0, 0, 0, 138, 140, 1, 0,
    0, 0, 139, 110, 1, 0, 0, 0, 139, 114, 1, 0, 0, 0, 139, 118, 1, 0, 0, 0, 139,
    124, 1, 0, 0, 0, 139, 131, 1, 0, 0, 0, 140, 9, 1, 0, 0, 0, 141, 151, 5, 16,
    0, 0, 142, 151, 5, 19, 0, 0, 143, 151, 5, 52, 0, 0, 144, 151, 5, 20, 0, 0,
    145, 147, 5, 21, 0, 0, 146, 148, 3, 14, 7, 0, 147, 146, 1, 0, 0, 0, 147,
    148, 1, 0, 0, 0, 148, 149, 1, 0, 0, 0, 149, 151, 5, 22, 0, 0, 150, 141, 1,
    0, 0, 0, 150, 142, 1, 0, 0, 0, 150, 143, 1, 0, 0, 0, 150, 144, 1, 0, 0, 0,
    150, 145, 1, 0, 0, 0, 151, 11, 1, 0, 0, 0, 152, 153, 7, 2, 0, 0, 153, 13, 1,
    0, 0, 0, 154, 165, 3, 16, 8, 0, 155, 165, 5, 52, 0, 0, 156, 165, 5, 53, 0,
    0, 157, 159, 5, 24, 0, 0, 158, 160, 9, 0, 0, 0, 159, 158, 1, 0, 0, 0, 160,
    161, 1, 0, 0, 0, 161, 162, 1, 0, 0, 0, 161, 159, 1, 0, 0, 0, 162, 165, 1, 0,
    0, 0, 163, 165, 3, 24, 12, 0, 164, 154, 1, 0, 0, 0, 164, 155, 1, 0, 0, 0,
    164, 156, 1, 0, 0, 0, 164, 157, 1, 0, 0, 0, 164, 163, 1, 0, 0, 0, 165, 15,
    1, 0, 0, 0, 166, 181, 5, 25, 0, 0, 167, 181, 5, 26, 0, 0, 168, 181, 3, 24,
    12, 0, 169, 174, 3, 18, 9, 0, 170, 171, 5, 60, 0, 0, 171, 173, 3, 18, 9, 0,
    172, 170, 1, 0, 0, 0, 173, 176, 1, 0, 0, 0, 174, 172, 1, 0, 0, 0, 174, 175,
    1, 0, 0, 0, 175, 177, 1, 0, 0, 0, 176, 174, 1, 0, 0, 0, 177, 178, 5, 60, 0,
    0, 178, 179, 5, 51, 0, 0, 179, 181, 1, 0, 0, 0, 180, 166, 1, 0, 0, 0, 180,
    167, 1, 0, 0, 0, 180, 168, 1, 0, 0, 0, 180, 169, 1, 0, 0, 0, 181, 17, 1, 0,
    0, 0, 182, 183, 3, 20, 10, 0, 183, 184, 5, 60, 0, 0, 184, 185, 3, 22, 11, 0,
    185, 190, 1, 0, 0, 0, 186, 187, 5, 53, 0, 0, 187, 188, 5, 60, 0, 0, 188,
    190, 3, 22, 11, 0, 189, 182, 1, 0, 0, 0, 189, 186, 1, 0, 0, 0, 190, 19, 1,
    0, 0, 0, 191, 192, 7, 3, 0, 0, 192, 21, 1, 0, 0, 0, 193, 194, 7, 4, 0, 0,
    194, 23, 1, 0, 0, 0, 195, 201, 5, 57, 0, 0, 196, 197, 5, 60, 0, 0, 197, 199,
    5, 58, 0, 0, 198, 200, 5, 59, 0, 0, 199, 198, 1, 0, 0, 0, 199, 200, 1, 0, 0,
    0, 200, 202, 1, 0, 0, 0, 201, 196, 1, 0, 0, 0, 201, 202, 1, 0, 0, 0, 202,
    25, 1, 0, 0, 0, 21, 58, 65, 72, 78, 95, 97, 99, 106, 122, 129, 137, 139,
    147, 150, 161, 164, 174, 180, 189, 199, 201,
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
  public rules(): RulesContext {
    return this.getTypedRuleContext(RulesContext, 0) as RulesContext;
  }
  public EOF(): TerminalNode {
    return this.getToken(reversionParser.EOF, 0);
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

export class RulesContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_rules;
  }
  public copyFrom(ctx: RulesContext): void {
    super.copyFrom(ctx);
  }
}
export class RevAfterContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevAfter) {
      listener.enterRevAfter(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevAfter) {
      listener.exitRevAfter(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevAfter) {
      return visitor.visitRevAfter(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevUntilContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevUntil) {
      listener.enterRevUntil(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevUntil) {
      listener.exitRevUntil(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevUntil) {
      return visitor.visitRevUntil(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevSkipContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevSkip) {
      listener.enterRevSkip(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevSkip) {
      listener.exitRevSkip(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevSkip) {
      return visitor.visitRevSkip(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevRangeBefore2Context extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rules(): RulesContext {
    return this.getTypedRuleContext(RulesContext, 0) as RulesContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevRangeBefore2) {
      listener.enterRevRangeBefore2(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevRangeBefore2) {
      listener.exitRevRangeBefore2(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevRangeBefore2) {
      return visitor.visitRevRangeBefore2(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevRangeBefore1Context extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rules(): RulesContext {
    return this.getTypedRuleContext(RulesContext, 0) as RulesContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevRangeBefore1) {
      listener.enterRevRangeBefore1(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevRangeBefore1) {
      listener.exitRevRangeBefore1(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevRangeBefore1) {
      return visitor.visitRevRangeBefore1(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevSingleContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rev(): RevContext {
    return this.getTypedRuleContext(RevContext, 0) as RevContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevSingle) {
      listener.enterRevSingle(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevSingle) {
      listener.exitRevSingle(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevSingle) {
      return visitor.visitRevSingle(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevBeforeContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevBefore) {
      listener.enterRevBefore(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevBefore) {
      listener.exitRevBefore(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevBefore) {
      return visitor.visitRevBefore(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevSinceContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevSince) {
      listener.enterRevSince(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevSince) {
      listener.exitRevSince(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevSince) {
      return visitor.visitRevSince(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevRangeAfter1Context extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rules(): RulesContext {
    return this.getTypedRuleContext(RulesContext, 0) as RulesContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevRangeAfter1) {
      listener.enterRevRangeAfter1(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevRangeAfter1) {
      listener.exitRevRangeAfter1(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevRangeAfter1) {
      return visitor.visitRevRangeAfter1(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevAuthorContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public ANY_list(): TerminalNode[] {
    return this.getTokens(reversionParser.ANY);
  }
  public ANY(i: number): TerminalNode {
    return this.getToken(reversionParser.ANY, i);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevAuthor) {
      listener.enterRevAuthor(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevAuthor) {
      listener.exitRevAuthor(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevAuthor) {
      return visitor.visitRevAuthor(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevRange1Context extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rules_list(): RulesContext[] {
    return this.getTypedRuleContexts(RulesContext) as RulesContext[];
  }
  public rules(i: number): RulesContext {
    return this.getTypedRuleContext(RulesContext, i) as RulesContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevRange1) {
      listener.enterRevRange1(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevRange1) {
      listener.exitRevRange1(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevRange1) {
      return visitor.visitRevRange1(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevRangeAfter2Context extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rules(): RulesContext {
    return this.getTypedRuleContext(RulesContext, 0) as RulesContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevRangeAfter2) {
      listener.enterRevRangeAfter2(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevRangeAfter2) {
      listener.exitRevRangeAfter2(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevRangeAfter2) {
      return visitor.visitRevRangeAfter2(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevCommiterContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public ANY_list(): TerminalNode[] {
    return this.getTokens(reversionParser.ANY);
  }
  public ANY(i: number): TerminalNode {
    return this.getToken(reversionParser.ANY, i);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevCommiter) {
      listener.enterRevCommiter(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevCommiter) {
      listener.exitRevCommiter(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevCommiter) {
      return visitor.visitRevCommiter(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevGrepContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public ANY_list(): TerminalNode[] {
    return this.getTokens(reversionParser.ANY);
  }
  public ANY(i: number): TerminalNode {
    return this.getToken(reversionParser.ANY, i);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevGrep) {
      listener.enterRevGrep(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevGrep) {
      listener.exitRevGrep(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevGrep) {
      return visitor.visitRevGrep(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevExpressionContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rev_expression(): Rev_expressionContext {
    return this.getTypedRuleContext(
      Rev_expressionContext,
      0,
    ) as Rev_expressionContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevExpression) {
      listener.enterRevExpression(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevExpression) {
      listener.exitRevExpression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevExpression) {
      return visitor.visitRevExpression(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevMaxAgeContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevMaxAge) {
      listener.enterRevMaxAge(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevMaxAge) {
      listener.exitRevMaxAge(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevMaxAge) {
      return visitor.visitRevMaxAge(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevMultiContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rules_list(): RulesContext[] {
    return this.getTypedRuleContexts(RulesContext) as RulesContext[];
  }
  public rules(i: number): RulesContext {
    return this.getTypedRuleContext(RulesContext, i) as RulesContext;
  }
  public SPACE_list(): TerminalNode[] {
    return this.getTokens(reversionParser.SPACE);
  }
  public SPACE(i: number): TerminalNode {
    return this.getToken(reversionParser.SPACE, i);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevMulti) {
      listener.enterRevMulti(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevMulti) {
      listener.exitRevMulti(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevMulti) {
      return visitor.visitRevMulti(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevMinAgeContext extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevMinAge) {
      listener.enterRevMinAge(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevMinAge) {
      listener.exitRevMinAge(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevMinAge) {
      return visitor.visitRevMinAge(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevRange2Context extends RulesContext {
  constructor(parser: reversionParser, ctx: RulesContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rules_list(): RulesContext[] {
    return this.getTypedRuleContexts(RulesContext) as RulesContext[];
  }
  public rules(i: number): RulesContext {
    return this.getTypedRuleContext(RulesContext, i) as RulesContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevRange2) {
      listener.enterRevRange2(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevRange2) {
      listener.exitRevRange2(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevRange2) {
      return visitor.visitRevRange2(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class RevContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_rev;
  }
  public copyFrom(ctx: RevContext): void {
    super.copyFrom(ctx);
  }
}
export class RefOIDContext extends RevContext {
  constructor(parser: reversionParser, ctx: RevContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public OID(): TerminalNode {
    return this.getToken(reversionParser.OID, 0);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRefOID) {
      listener.enterRefOID(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRefOID) {
      listener.exitRefOID(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRefOID) {
      return visitor.visitRefOID(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RefNameContext extends RevContext {
  constructor(parser: reversionParser, ctx: RevContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public refname(): RefnameContext {
    return this.getTypedRuleContext(RefnameContext, 0) as RefnameContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRefName) {
      listener.enterRefName(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRefName) {
      listener.exitRefName(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRefName) {
      return visitor.visitRefName(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class RevExcludeContext extends RevContext {
  constructor(parser: reversionParser, ctx: RevContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rev(): RevContext {
    return this.getTypedRuleContext(RevContext, 0) as RevContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRevExclude) {
      listener.enterRevExclude(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRevExclude) {
      listener.exitRevExclude(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRevExclude) {
      return visitor.visitRevExclude(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class RefnameContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_refname;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRefname) {
      listener.enterRefname(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRefname) {
      listener.exitRefname(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRefname) {
      return visitor.visitRefname(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Rev_expressionContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_rev_expression;
  }
  public copyFrom(ctx: Rev_expressionContext): void {
    super.copyFrom(ctx);
  }
}
export class ExprPosContext extends Rev_expressionContext {
  constructor(parser: reversionParser, ctx: Rev_expressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rev(): RevContext {
    return this.getTypedRuleContext(RevContext, 0) as RevContext;
  }
  public rev_direction(): Rev_directionContext {
    return this.getTypedRuleContext(
      Rev_directionContext,
      0,
    ) as Rev_directionContext;
  }
  public rev_position(): Rev_positionContext {
    return this.getTypedRuleContext(
      Rev_positionContext,
      0,
    ) as Rev_positionContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterExprPos) {
      listener.enterExprPos(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitExprPos) {
      listener.exitExprPos(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitExprPos) {
      return visitor.visitExprPos(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ExprDigitContext extends Rev_expressionContext {
  constructor(parser: reversionParser, ctx: Rev_expressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rev(): RevContext {
    return this.getTypedRuleContext(RevContext, 0) as RevContext;
  }
  public rev_direction(): Rev_directionContext {
    return this.getTypedRuleContext(
      Rev_directionContext,
      0,
    ) as Rev_directionContext;
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterExprDigit) {
      listener.enterExprDigit(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitExprDigit) {
      listener.exitExprDigit(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitExprDigit) {
      return visitor.visitExprDigit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ExprRevTextContext extends Rev_expressionContext {
  constructor(parser: reversionParser, ctx: Rev_expressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public rev(): RevContext {
    return this.getTypedRuleContext(RevContext, 0) as RevContext;
  }
  public ANY_list(): TerminalNode[] {
    return this.getTokens(reversionParser.ANY);
  }
  public ANY(i: number): TerminalNode {
    return this.getToken(reversionParser.ANY, i);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterExprRevText) {
      listener.enterExprRevText(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitExprRevText) {
      listener.exitExprRevText(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitExprRevText) {
      return visitor.visitExprRevText(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ExprTextContext extends Rev_expressionContext {
  constructor(parser: reversionParser, ctx: Rev_expressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public ANY_list(): TerminalNode[] {
    return this.getTokens(reversionParser.ANY);
  }
  public ANY(i: number): TerminalNode {
    return this.getToken(reversionParser.ANY, i);
  }
  public SPACE_list(): TerminalNode[] {
    return this.getTokens(reversionParser.SPACE);
  }
  public SPACE(i: number): TerminalNode {
    return this.getToken(reversionParser.SPACE, i);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterExprText) {
      listener.enterExprText(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitExprText) {
      listener.exitExprText(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitExprText) {
      return visitor.visitExprText(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class ExprDigitTextContext extends Rev_expressionContext {
  constructor(parser: reversionParser, ctx: Rev_expressionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public ANY_list(): TerminalNode[] {
    return this.getTokens(reversionParser.ANY);
  }
  public ANY(i: number): TerminalNode {
    return this.getToken(reversionParser.ANY, i);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterExprDigitText) {
      listener.enterExprDigitText(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitExprDigitText) {
      listener.exitExprDigitText(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitExprDigitText) {
      return visitor.visitExprDigitText(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Rev_positionContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_rev_position;
  }
  public copyFrom(ctx: Rev_positionContext): void {
    super.copyFrom(ctx);
  }
}
export class PosReverseContext extends Rev_positionContext {
  constructor(parser: reversionParser, ctx: Rev_positionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterPosReverse) {
      listener.enterPosReverse(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitPosReverse) {
      listener.exitPosReverse(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitPosReverse) {
      return visitor.visitPosReverse(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class PosExcludeContext extends Rev_positionContext {
  constructor(parser: reversionParser, ctx: Rev_positionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterPosExclude) {
      listener.enterPosExclude(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitPosExclude) {
      listener.exitPosExclude(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitPosExclude) {
      return visitor.visitPosExclude(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class PosNegContext extends Rev_positionContext {
  constructor(parser: reversionParser, ctx: Rev_positionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public SIGNED_DIGIT(): TerminalNode {
    return this.getToken(reversionParser.SIGNED_DIGIT, 0);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterPosNeg) {
      listener.enterPosNeg(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitPosNeg) {
      listener.exitPosNeg(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitPosNeg) {
      return visitor.visitPosNeg(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class PosHeadContext extends Rev_positionContext {
  constructor(parser: reversionParser, ctx: Rev_positionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterPosHead) {
      listener.enterPosHead(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitPosHead) {
      listener.exitPosHead(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitPosHead) {
      return visitor.visitPosHead(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class PosAnchorContext extends Rev_positionContext {
  constructor(parser: reversionParser, ctx: Rev_positionContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public ref_anchor(): Ref_anchorContext {
    return this.getTypedRuleContext(Ref_anchorContext, 0) as Ref_anchorContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterPosAnchor) {
      listener.enterPosAnchor(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitPosAnchor) {
      listener.exitPosAnchor(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitPosAnchor) {
      return visitor.visitPosAnchor(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Rev_directionContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_rev_direction;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRev_direction) {
      listener.enterRev_direction(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRev_direction) {
      listener.exitRev_direction(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRev_direction) {
      return visitor.visitRev_direction(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Ref_anchorContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_ref_anchor;
  }
  public copyFrom(ctx: Ref_anchorContext): void {
    super.copyFrom(ctx);
  }
}
export class AnchorIsoContext extends Ref_anchorContext {
  constructor(parser: reversionParser, ctx: Ref_anchorContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public iso_8601(): Iso_8601Context {
    return this.getTypedRuleContext(Iso_8601Context, 0) as Iso_8601Context;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterAnchorIso) {
      listener.enterAnchorIso(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitAnchorIso) {
      listener.exitAnchorIso(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitAnchorIso) {
      return visitor.visitAnchorIso(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class AnchorTextContext extends Ref_anchorContext {
  constructor(parser: reversionParser, ctx: Ref_anchorContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterAnchorText) {
      listener.enterAnchorText(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitAnchorText) {
      listener.exitAnchorText(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitAnchorText) {
      return visitor.visitAnchorText(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class AnchorDateContext extends Ref_anchorContext {
  constructor(parser: reversionParser, ctx: Ref_anchorContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterAnchorDate) {
      listener.enterAnchorDate(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitAnchorDate) {
      listener.exitAnchorDate(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitAnchorDate) {
      return visitor.visitAnchorDate(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class AnchorDigitContext extends Ref_anchorContext {
  constructor(parser: reversionParser, ctx: Ref_anchorContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterAnchorDigit) {
      listener.enterAnchorDigit(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitAnchorDigit) {
      listener.exitAnchorDigit(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitAnchorDigit) {
      return visitor.visitAnchorDigit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class AnchorSignedDigitContext extends Ref_anchorContext {
  constructor(parser: reversionParser, ctx: Ref_anchorContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public SIGNED_DIGIT(): TerminalNode {
    return this.getToken(reversionParser.SIGNED_DIGIT, 0);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterAnchorSignedDigit) {
      listener.enterAnchorSignedDigit(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitAnchorSignedDigit) {
      listener.exitAnchorSignedDigit(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitAnchorSignedDigit) {
      return visitor.visitAnchorSignedDigit(this);
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
  public get ruleIndex(): number {
    return reversionParser.RULE_date;
  }
  public copyFrom(ctx: DateContext): void {
    super.copyFrom(ctx);
  }
}
export class DateTimePointContext extends DateContext {
  constructor(parser: reversionParser, ctx: DateContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public time_point_list(): Time_pointContext[] {
    return this.getTypedRuleContexts(Time_pointContext) as Time_pointContext[];
  }
  public time_point(i: number): Time_pointContext {
    return this.getTypedRuleContext(Time_pointContext, i) as Time_pointContext;
  }
  public SPACE_list(): TerminalNode[] {
    return this.getTokens(reversionParser.SPACE);
  }
  public SPACE(i: number): TerminalNode {
    return this.getToken(reversionParser.SPACE, i);
  }
  public TIME_DIRECTION(): TerminalNode {
    return this.getToken(reversionParser.TIME_DIRECTION, 0);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterDateTimePoint) {
      listener.enterDateTimePoint(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitDateTimePoint) {
      listener.exitDateTimePoint(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitDateTimePoint) {
      return visitor.visitDateTimePoint(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class DateYesterdayContext extends DateContext {
  constructor(parser: reversionParser, ctx: DateContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterDateYesterday) {
      listener.enterDateYesterday(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitDateYesterday) {
      listener.exitDateYesterday(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitDateYesterday) {
      return visitor.visitDateYesterday(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class DateIso8601Context extends DateContext {
  constructor(parser: reversionParser, ctx: DateContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public iso_8601(): Iso_8601Context {
    return this.getTypedRuleContext(Iso_8601Context, 0) as Iso_8601Context;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterDateIso8601) {
      listener.enterDateIso8601(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitDateIso8601) {
      listener.exitDateIso8601(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitDateIso8601) {
      return visitor.visitDateIso8601(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class DateTodayContext extends DateContext {
  constructor(parser: reversionParser, ctx: DateContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterDateToday) {
      listener.enterDateToday(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitDateToday) {
      listener.exitDateToday(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitDateToday) {
      return visitor.visitDateToday(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Time_pointContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_time_point;
  }
  public copyFrom(ctx: Time_pointContext): void {
    super.copyFrom(ctx);
  }
}
export class TimePointValueContext extends Time_pointContext {
  constructor(parser: reversionParser, ctx: Time_pointContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public time_value(): Time_valueContext {
    return this.getTypedRuleContext(Time_valueContext, 0) as Time_valueContext;
  }
  public SPACE(): TerminalNode {
    return this.getToken(reversionParser.SPACE, 0);
  }
  public time_unit(): Time_unitContext {
    return this.getTypedRuleContext(Time_unitContext, 0) as Time_unitContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterTimePointValue) {
      listener.enterTimePointValue(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitTimePointValue) {
      listener.exitTimePointValue(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitTimePointValue) {
      return visitor.visitTimePointValue(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
export class TimePointDigitContext extends Time_pointContext {
  constructor(parser: reversionParser, ctx: Time_pointContext) {
    super(parser, ctx.parentCtx, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public SPACE(): TerminalNode {
    return this.getToken(reversionParser.SPACE, 0);
  }
  public time_unit(): Time_unitContext {
    return this.getTypedRuleContext(Time_unitContext, 0) as Time_unitContext;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterTimePointDigit) {
      listener.enterTimePointDigit(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitTimePointDigit) {
      listener.exitTimePointDigit(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitTimePointDigit) {
      return visitor.visitTimePointDigit(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}

export class Time_valueContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_time_value;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterTime_value) {
      listener.enterTime_value(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitTime_value) {
      listener.exitTime_value(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitTime_value) {
      return visitor.visitTime_value(this);
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

export class Iso_8601Context extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public ISO_DATE(): TerminalNode {
    return this.getToken(reversionParser.ISO_DATE, 0);
  }
  public SPACE(): TerminalNode {
    return this.getToken(reversionParser.SPACE, 0);
  }
  public ISO_TIME(): TerminalNode {
    return this.getToken(reversionParser.ISO_TIME, 0);
  }
  public IS_TIME_POSTFIX(): TerminalNode {
    return this.getToken(reversionParser.IS_TIME_POSTFIX, 0);
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_iso_8601;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterIso_8601) {
      listener.enterIso_8601(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitIso_8601) {
      listener.exitIso_8601(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitIso_8601) {
      return visitor.visitIso_8601(this);
    } else {
      return visitor.visitChildren(this);
    }
  }
}
