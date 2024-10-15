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
  public static readonly TIME_VALUE = 27;
  public static readonly TIME_UINT = 28;
  public static readonly TIME_DIRECTION = 29;
  public static readonly SIGNED_DIGIT = 30;
  public static readonly DIGIT = 31;
  public static readonly OID = 32;
  public static readonly OID_SHORT = 33;
  public static readonly OID_LONG = 34;
  public static readonly ISO_DATE = 35;
  public static readonly ISO_TIME = 36;
  public static readonly IS_TIME_POSTFIX = 37;
  public static readonly SPACE = 38;
  public static readonly INT12 = 39;
  public static readonly INT2 = 40;
  public static readonly INT4 = 41;
  public static readonly ANY = 42;
  public static readonly OID_EL = 43;
  public static readonly NEWLINE = 44;
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
  public static readonly RULE_iso_8601 = 10;
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
    'TIME_VALUE',
    'TIME_UINT',
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
        this.state = 22;
        this.rules(0);
        this.state = 23;
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
        this.state = 74;
        this._errHandler.sync(this);
        switch (this._interp.adaptivePredict(this._input, 3, this._ctx)) {
          case 1:
            {
              this.state = 26;
              this.rev();
            }
            break;
          case 2:
            {
              this.state = 27;
              this.rev_expression();
            }
            break;
          case 3:
            {
              this.state = 28;
              this.match(reversionParser.T__0);
              this.state = 29;
              this.match(reversionParser.T__1);
              this.state = 30;
              this.date();
            }
            break;
          case 4:
            {
              this.state = 31;
              this.match(reversionParser.T__2);
              this.state = 32;
              this.match(reversionParser.T__1);
              this.state = 33;
              this.date();
            }
            break;
          case 5:
            {
              this.state = 34;
              this.match(reversionParser.T__3);
              this.state = 35;
              this.match(reversionParser.T__1);
              this.state = 36;
              this.date();
            }
            break;
          case 6:
            {
              this.state = 37;
              this.match(reversionParser.T__4);
              this.state = 38;
              this.match(reversionParser.T__1);
              this.state = 39;
              this.match(reversionParser.DIGIT);
            }
            break;
          case 7:
            {
              this.state = 40;
              this.match(reversionParser.T__5);
              this.state = 41;
              this.match(reversionParser.T__1);
              this.state = 42;
              this.date();
            }
            break;
          case 8:
            {
              this.state = 43;
              this.match(reversionParser.T__6);
              this.state = 44;
              this.match(reversionParser.T__1);
              this.state = 45;
              this.date();
            }
            break;
          case 9:
            {
              this.state = 46;
              this.match(reversionParser.T__7);
              this.state = 47;
              this.match(reversionParser.T__1);
              this.state = 48;
              this.date();
            }
            break;
          case 10:
            {
              this.state = 49;
              this.match(reversionParser.T__8);
              this.state = 50;
              this.match(reversionParser.T__1);
              this.state = 52;
              this._errHandler.sync(this);
              _alt = 1;
              do {
                switch (_alt) {
                  case 1:
                    {
                      {
                        this.state = 51;
                        this.match(reversionParser.ANY);
                      }
                    }
                    break;
                  default:
                    throw new NoViableAltException(this);
                }
                this.state = 54;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 0, this._ctx);
              } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
            break;
          case 11:
            {
              this.state = 56;
              this.match(reversionParser.T__9);
              this.state = 57;
              this.match(reversionParser.T__1);
              this.state = 59;
              this._errHandler.sync(this);
              _alt = 1;
              do {
                switch (_alt) {
                  case 1:
                    {
                      {
                        this.state = 58;
                        this.match(reversionParser.ANY);
                      }
                    }
                    break;
                  default:
                    throw new NoViableAltException(this);
                }
                this.state = 61;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 1, this._ctx);
              } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
            break;
          case 12:
            {
              this.state = 63;
              this.match(reversionParser.T__10);
              this.state = 64;
              this.match(reversionParser.T__1);
              this.state = 66;
              this._errHandler.sync(this);
              _alt = 1;
              do {
                switch (_alt) {
                  case 1:
                    {
                      {
                        this.state = 65;
                        this.match(reversionParser.ANY);
                      }
                    }
                    break;
                  default:
                    throw new NoViableAltException(this);
                }
                this.state = 68;
                this._errHandler.sync(this);
                _alt = this._interp.adaptivePredict(this._input, 2, this._ctx);
              } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
            }
            break;
          case 13:
            {
              this.state = 70;
              this.match(reversionParser.T__11);
              this.state = 71;
              this.rules(2);
            }
            break;
          case 14:
            {
              this.state = 72;
              this.match(reversionParser.T__12);
              this.state = 73;
              this.rules(1);
            }
            break;
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 95;
        this._errHandler.sync(this);
        _alt = this._interp.adaptivePredict(this._input, 6, this._ctx);
        while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
          if (_alt === 1) {
            if (this._parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            _prevctx = localctx;
            {
              this.state = 93;
              this._errHandler.sync(this);
              switch (this._interp.adaptivePredict(this._input, 5, this._ctx)) {
                case 1:
                  {
                    localctx = new RulesContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 76;
                    if (!this.precpred(this._ctx, 4)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 4)',
                      );
                    }
                    this.state = 77;
                    this.match(reversionParser.T__11);
                    this.state = 78;
                    this.rules(5);
                  }
                  break;
                case 2:
                  {
                    localctx = new RulesContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 79;
                    if (!this.precpred(this._ctx, 3)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 3)',
                      );
                    }
                    this.state = 80;
                    this.match(reversionParser.T__12);
                    this.state = 81;
                    this.rules(4);
                  }
                  break;
                case 3:
                  {
                    localctx = new RulesContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 82;
                    if (!this.precpred(this._ctx, 7)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 7)',
                      );
                    }
                    this.state = 83;
                    this.match(reversionParser.T__11);
                  }
                  break;
                case 4:
                  {
                    localctx = new RulesContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 84;
                    if (!this.precpred(this._ctx, 6)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 6)',
                      );
                    }
                    this.state = 85;
                    this.match(reversionParser.T__12);
                  }
                  break;
                case 5:
                  {
                    localctx = new RulesContext(this, _parentctx, _parentState);
                    this.pushNewRecursionContext(
                      localctx,
                      _startState,
                      reversionParser.RULE_rules,
                    );
                    this.state = 86;
                    if (!this.precpred(this._ctx, 5)) {
                      throw this.createFailedPredicateException(
                        'this.precpred(this._ctx, 5)',
                      );
                    }
                    this.state = 89;
                    this._errHandler.sync(this);
                    _alt = 1;
                    do {
                      switch (_alt) {
                        case 1:
                          {
                            {
                              this.state = 87;
                              this.match(reversionParser.SPACE);
                              this.state = 88;
                              this.rules(0);
                            }
                          }
                          break;
                        default:
                          throw new NoViableAltException(this);
                      }
                      this.state = 91;
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
          this.state = 97;
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
      this.state = 102;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 15:
        case 16:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 98;
            this.refname();
          }
          break;
        case 32:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 99;
            this.match(reversionParser.OID);
          }
          break;
        case 14:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 100;
            this.match(reversionParser.T__13);
            this.state = 101;
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
        this.state = 104;
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
      this.state = 135;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 11, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 106;
            this.rev();
            this.state = 107;
            this.rev_direction();
            this.state = 108;
            this.rev_position();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 110;
            this.rev();
            this.state = 111;
            this.rev_direction();
            this.state = 112;
            this.match(reversionParser.DIGIT);
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 114;
            this.match(reversionParser.T__16);
            this.state = 116;
            this._errHandler.sync(this);
            _alt = 1;
            do {
              switch (_alt) {
                case 1:
                  {
                    {
                      this.state = 115;
                      _la = this._input.LA(1);
                      if (!(_la === 38 || _la === 42)) {
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
              this.state = 118;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 8, this._ctx);
            } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 120;
            this.rev();
            this.state = 121;
            this.match(reversionParser.T__17);
            this.state = 123;
            this._errHandler.sync(this);
            _alt = 1;
            do {
              switch (_alt) {
                case 1:
                  {
                    {
                      this.state = 122;
                      this.match(reversionParser.ANY);
                    }
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 125;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 9, this._ctx);
            } while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
          }
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 127;
            this.match(reversionParser.T__17);
            this.state = 128;
            this.match(reversionParser.DIGIT);
            this.state = 129;
            this.match(reversionParser.T__17);
            this.state = 131;
            this._errHandler.sync(this);
            _alt = 1;
            do {
              switch (_alt) {
                case 1:
                  {
                    {
                      this.state = 130;
                      this.match(reversionParser.ANY);
                    }
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 133;
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
      this.state = 146;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 16:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 137;
            this.match(reversionParser.T__15);
          }
          break;
        case 19:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 138;
            this.match(reversionParser.T__18);
          }
          break;
        case 30:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 139;
            this.match(reversionParser.SIGNED_DIGIT);
          }
          break;
        case 20:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 140;
            this.match(reversionParser.T__19);
          }
          break;
        case 21:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 141;
            this.match(reversionParser.T__20);
            this.state = 143;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (
              ((_la - 24) & ~0x1f) === 0 &&
              ((1 << (_la - 24)) & 2255) !== 0
            ) {
              {
                this.state = 142;
                this.ref_anchor();
              }
            }

            this.state = 145;
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
        this.state = 148;
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
      this.state = 160;
      this._errHandler.sync(this);
      switch (this._interp.adaptivePredict(this._input, 15, this._ctx)) {
        case 1:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 150;
            this.date();
          }
          break;
        case 2:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 151;
            this.match(reversionParser.SIGNED_DIGIT);
          }
          break;
        case 3:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 152;
            this.match(reversionParser.DIGIT);
          }
          break;
        case 4:
          this.enterOuterAlt(localctx, 4);
          {
            this.state = 153;
            this.match(reversionParser.T__23);
            this.state = 155;
            this._errHandler.sync(this);
            _alt = 1 + 1;
            do {
              switch (_alt) {
                case 1 + 1:
                  {
                    {
                      this.state = 154;
                      this.matchWildcard();
                    }
                  }
                  break;
                default:
                  throw new NoViableAltException(this);
              }
              this.state = 157;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 14, this._ctx);
            } while (_alt !== 1 && _alt !== ATN.INVALID_ALT_NUMBER);
          }
          break;
        case 5:
          this.enterOuterAlt(localctx, 5);
          {
            this.state = 159;
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
      this.state = 175;
      this._errHandler.sync(this);
      switch (this._input.LA(1)) {
        case 25:
          this.enterOuterAlt(localctx, 1);
          {
            this.state = 162;
            this.match(reversionParser.T__24);
          }
          break;
        case 26:
          this.enterOuterAlt(localctx, 2);
          {
            this.state = 163;
            this.match(reversionParser.T__25);
          }
          break;
        case 27:
        case 31:
          this.enterOuterAlt(localctx, 3);
          {
            this.state = 164;
            this.time_point();
            this.state = 169;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
            while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
              if (_alt === 1) {
                {
                  {
                    this.state = 165;
                    this.match(reversionParser.SPACE);
                    this.state = 166;
                    this.time_point();
                  }
                }
              }
              this.state = 171;
              this._errHandler.sync(this);
              _alt = this._interp.adaptivePredict(this._input, 16, this._ctx);
            }
            this.state = 172;
            this.match(reversionParser.SPACE);
            this.state = 173;
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
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 177;
        _la = this._input.LA(1);
        if (!(_la === 27 || _la === 31)) {
          this._errHandler.recoverInline(this);
        } else {
          this._errHandler.reportMatch(this);
          this.consume();
        }
        this.state = 178;
        this.match(reversionParser.SPACE);
        this.state = 179;
        this.match(reversionParser.TIME_UINT);
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
    this.enterRule(localctx, 20, reversionParser.RULE_iso_8601);
    let _la: number;
    try {
      this.enterOuterAlt(localctx, 1);
      {
        this.state = 181;
        this.match(reversionParser.ISO_DATE);
        this.state = 187;
        this._errHandler.sync(this);
        _la = this._input.LA(1);
        if (_la === 38) {
          {
            this.state = 182;
            this.match(reversionParser.SPACE);
            this.state = 183;
            this.match(reversionParser.ISO_TIME);
            this.state = 185;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if (_la === 37) {
              {
                this.state = 184;
                this.match(reversionParser.IS_TIME_POSTFIX);
              }
            }
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
    4, 1, 44, 190, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4, 7, 4,
    2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7, 10, 1,
    0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 53, 8, 1, 11, 1, 12, 1, 54, 1, 1, 1, 1, 1,
    1, 4, 1, 60, 8, 1, 11, 1, 12, 1, 61, 1, 1, 1, 1, 1, 1, 4, 1, 67, 8, 1, 11,
    1, 12, 1, 68, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 75, 8, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 1, 90, 8, 1, 11,
    1, 12, 1, 91, 5, 1, 94, 8, 1, 10, 1, 12, 1, 97, 9, 1, 1, 2, 1, 2, 1, 2, 1,
    2, 3, 2, 103, 8, 2, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1, 4, 1,
    4, 1, 4, 1, 4, 4, 4, 117, 8, 4, 11, 4, 12, 4, 118, 1, 4, 1, 4, 1, 4, 4, 4,
    124, 8, 4, 11, 4, 12, 4, 125, 1, 4, 1, 4, 1, 4, 1, 4, 4, 4, 132, 8, 4, 11,
    4, 12, 4, 133, 3, 4, 136, 8, 4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 3, 5,
    144, 8, 5, 1, 5, 3, 5, 147, 8, 5, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7,
    4, 7, 156, 8, 7, 11, 7, 12, 7, 157, 1, 7, 3, 7, 161, 8, 7, 1, 8, 1, 8, 1, 8,
    1, 8, 1, 8, 5, 8, 168, 8, 8, 10, 8, 12, 8, 171, 9, 8, 1, 8, 1, 8, 1, 8, 3,
    8, 176, 8, 8, 1, 9, 1, 9, 1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 10, 3, 10,
    186, 8, 10, 3, 10, 188, 8, 10, 1, 10, 1, 157, 1, 2, 11, 0, 2, 4, 6, 8, 10,
    12, 14, 16, 18, 20, 0, 4, 1, 0, 15, 16, 2, 0, 38, 38, 42, 42, 3, 0, 14, 14,
    16, 16, 23, 23, 2, 0, 27, 27, 31, 31, 224, 0, 22, 1, 0, 0, 0, 2, 74, 1, 0,
    0, 0, 4, 102, 1, 0, 0, 0, 6, 104, 1, 0, 0, 0, 8, 135, 1, 0, 0, 0, 10, 146,
    1, 0, 0, 0, 12, 148, 1, 0, 0, 0, 14, 160, 1, 0, 0, 0, 16, 175, 1, 0, 0, 0,
    18, 177, 1, 0, 0, 0, 20, 181, 1, 0, 0, 0, 22, 23, 3, 2, 1, 0, 23, 24, 5, 0,
    0, 1, 24, 1, 1, 0, 0, 0, 25, 26, 6, 1, -1, 0, 26, 75, 3, 4, 2, 0, 27, 75, 3,
    8, 4, 0, 28, 29, 5, 1, 0, 0, 29, 30, 5, 2, 0, 0, 30, 75, 3, 16, 8, 0, 31,
    32, 5, 3, 0, 0, 32, 33, 5, 2, 0, 0, 33, 75, 3, 16, 8, 0, 34, 35, 5, 4, 0, 0,
    35, 36, 5, 2, 0, 0, 36, 75, 3, 16, 8, 0, 37, 38, 5, 5, 0, 0, 38, 39, 5, 2,
    0, 0, 39, 75, 5, 31, 0, 0, 40, 41, 5, 6, 0, 0, 41, 42, 5, 2, 0, 0, 42, 75,
    3, 16, 8, 0, 43, 44, 5, 7, 0, 0, 44, 45, 5, 2, 0, 0, 45, 75, 3, 16, 8, 0,
    46, 47, 5, 8, 0, 0, 47, 48, 5, 2, 0, 0, 48, 75, 3, 16, 8, 0, 49, 50, 5, 9,
    0, 0, 50, 52, 5, 2, 0, 0, 51, 53, 5, 42, 0, 0, 52, 51, 1, 0, 0, 0, 53, 54,
    1, 0, 0, 0, 54, 52, 1, 0, 0, 0, 54, 55, 1, 0, 0, 0, 55, 75, 1, 0, 0, 0, 56,
    57, 5, 10, 0, 0, 57, 59, 5, 2, 0, 0, 58, 60, 5, 42, 0, 0, 59, 58, 1, 0, 0,
    0, 60, 61, 1, 0, 0, 0, 61, 59, 1, 0, 0, 0, 61, 62, 1, 0, 0, 0, 62, 75, 1, 0,
    0, 0, 63, 64, 5, 11, 0, 0, 64, 66, 5, 2, 0, 0, 65, 67, 5, 42, 0, 0, 66, 65,
    1, 0, 0, 0, 67, 68, 1, 0, 0, 0, 68, 66, 1, 0, 0, 0, 68, 69, 1, 0, 0, 0, 69,
    75, 1, 0, 0, 0, 70, 71, 5, 12, 0, 0, 71, 75, 3, 2, 1, 2, 72, 73, 5, 13, 0,
    0, 73, 75, 3, 2, 1, 1, 74, 25, 1, 0, 0, 0, 74, 27, 1, 0, 0, 0, 74, 28, 1, 0,
    0, 0, 74, 31, 1, 0, 0, 0, 74, 34, 1, 0, 0, 0, 74, 37, 1, 0, 0, 0, 74, 40, 1,
    0, 0, 0, 74, 43, 1, 0, 0, 0, 74, 46, 1, 0, 0, 0, 74, 49, 1, 0, 0, 0, 74, 56,
    1, 0, 0, 0, 74, 63, 1, 0, 0, 0, 74, 70, 1, 0, 0, 0, 74, 72, 1, 0, 0, 0, 75,
    95, 1, 0, 0, 0, 76, 77, 10, 4, 0, 0, 77, 78, 5, 12, 0, 0, 78, 94, 3, 2, 1,
    5, 79, 80, 10, 3, 0, 0, 80, 81, 5, 13, 0, 0, 81, 94, 3, 2, 1, 4, 82, 83, 10,
    7, 0, 0, 83, 94, 5, 12, 0, 0, 84, 85, 10, 6, 0, 0, 85, 94, 5, 13, 0, 0, 86,
    89, 10, 5, 0, 0, 87, 88, 5, 38, 0, 0, 88, 90, 3, 2, 1, 0, 89, 87, 1, 0, 0,
    0, 90, 91, 1, 0, 0, 0, 91, 89, 1, 0, 0, 0, 91, 92, 1, 0, 0, 0, 92, 94, 1, 0,
    0, 0, 93, 76, 1, 0, 0, 0, 93, 79, 1, 0, 0, 0, 93, 82, 1, 0, 0, 0, 93, 84, 1,
    0, 0, 0, 93, 86, 1, 0, 0, 0, 94, 97, 1, 0, 0, 0, 95, 93, 1, 0, 0, 0, 95, 96,
    1, 0, 0, 0, 96, 3, 1, 0, 0, 0, 97, 95, 1, 0, 0, 0, 98, 103, 3, 6, 3, 0, 99,
    103, 5, 32, 0, 0, 100, 101, 5, 14, 0, 0, 101, 103, 3, 4, 2, 0, 102, 98, 1,
    0, 0, 0, 102, 99, 1, 0, 0, 0, 102, 100, 1, 0, 0, 0, 103, 5, 1, 0, 0, 0, 104,
    105, 7, 0, 0, 0, 105, 7, 1, 0, 0, 0, 106, 107, 3, 4, 2, 0, 107, 108, 3, 12,
    6, 0, 108, 109, 3, 10, 5, 0, 109, 136, 1, 0, 0, 0, 110, 111, 3, 4, 2, 0,
    111, 112, 3, 12, 6, 0, 112, 113, 5, 31, 0, 0, 113, 136, 1, 0, 0, 0, 114,
    116, 5, 17, 0, 0, 115, 117, 7, 1, 0, 0, 116, 115, 1, 0, 0, 0, 117, 118, 1,
    0, 0, 0, 118, 116, 1, 0, 0, 0, 118, 119, 1, 0, 0, 0, 119, 136, 1, 0, 0, 0,
    120, 121, 3, 4, 2, 0, 121, 123, 5, 18, 0, 0, 122, 124, 5, 42, 0, 0, 123,
    122, 1, 0, 0, 0, 124, 125, 1, 0, 0, 0, 125, 123, 1, 0, 0, 0, 125, 126, 1, 0,
    0, 0, 126, 136, 1, 0, 0, 0, 127, 128, 5, 18, 0, 0, 128, 129, 5, 31, 0, 0,
    129, 131, 5, 18, 0, 0, 130, 132, 5, 42, 0, 0, 131, 130, 1, 0, 0, 0, 132,
    133, 1, 0, 0, 0, 133, 131, 1, 0, 0, 0, 133, 134, 1, 0, 0, 0, 134, 136, 1, 0,
    0, 0, 135, 106, 1, 0, 0, 0, 135, 110, 1, 0, 0, 0, 135, 114, 1, 0, 0, 0, 135,
    120, 1, 0, 0, 0, 135, 127, 1, 0, 0, 0, 136, 9, 1, 0, 0, 0, 137, 147, 5, 16,
    0, 0, 138, 147, 5, 19, 0, 0, 139, 147, 5, 30, 0, 0, 140, 147, 5, 20, 0, 0,
    141, 143, 5, 21, 0, 0, 142, 144, 3, 14, 7, 0, 143, 142, 1, 0, 0, 0, 143,
    144, 1, 0, 0, 0, 144, 145, 1, 0, 0, 0, 145, 147, 5, 22, 0, 0, 146, 137, 1,
    0, 0, 0, 146, 138, 1, 0, 0, 0, 146, 139, 1, 0, 0, 0, 146, 140, 1, 0, 0, 0,
    146, 141, 1, 0, 0, 0, 147, 11, 1, 0, 0, 0, 148, 149, 7, 2, 0, 0, 149, 13, 1,
    0, 0, 0, 150, 161, 3, 16, 8, 0, 151, 161, 5, 30, 0, 0, 152, 161, 5, 31, 0,
    0, 153, 155, 5, 24, 0, 0, 154, 156, 9, 0, 0, 0, 155, 154, 1, 0, 0, 0, 156,
    157, 1, 0, 0, 0, 157, 158, 1, 0, 0, 0, 157, 155, 1, 0, 0, 0, 158, 161, 1, 0,
    0, 0, 159, 161, 3, 20, 10, 0, 160, 150, 1, 0, 0, 0, 160, 151, 1, 0, 0, 0,
    160, 152, 1, 0, 0, 0, 160, 153, 1, 0, 0, 0, 160, 159, 1, 0, 0, 0, 161, 15,
    1, 0, 0, 0, 162, 176, 5, 25, 0, 0, 163, 176, 5, 26, 0, 0, 164, 169, 3, 18,
    9, 0, 165, 166, 5, 38, 0, 0, 166, 168, 3, 18, 9, 0, 167, 165, 1, 0, 0, 0,
    168, 171, 1, 0, 0, 0, 169, 167, 1, 0, 0, 0, 169, 170, 1, 0, 0, 0, 170, 172,
    1, 0, 0, 0, 171, 169, 1, 0, 0, 0, 172, 173, 5, 38, 0, 0, 173, 174, 5, 29, 0,
    0, 174, 176, 1, 0, 0, 0, 175, 162, 1, 0, 0, 0, 175, 163, 1, 0, 0, 0, 175,
    164, 1, 0, 0, 0, 176, 17, 1, 0, 0, 0, 177, 178, 7, 3, 0, 0, 178, 179, 5, 38,
    0, 0, 179, 180, 5, 28, 0, 0, 180, 19, 1, 0, 0, 0, 181, 187, 5, 35, 0, 0,
    182, 183, 5, 38, 0, 0, 183, 185, 5, 36, 0, 0, 184, 186, 5, 37, 0, 0, 185,
    184, 1, 0, 0, 0, 185, 186, 1, 0, 0, 0, 186, 188, 1, 0, 0, 0, 187, 182, 1, 0,
    0, 0, 187, 188, 1, 0, 0, 0, 188, 21, 1, 0, 0, 0, 20, 54, 61, 68, 74, 91, 93,
    95, 102, 118, 125, 133, 135, 143, 146, 157, 160, 169, 175, 185, 187,
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
  public rev(): RevContext {
    return this.getTypedRuleContext(RevContext, 0) as RevContext;
  }
  public rev_expression(): Rev_expressionContext {
    return this.getTypedRuleContext(
      Rev_expressionContext,
      0,
    ) as Rev_expressionContext;
  }
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
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
  public get ruleIndex(): number {
    return reversionParser.RULE_rules;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRules) {
      listener.enterRules(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRules) {
      listener.exitRules(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRules) {
      return visitor.visitRules(this);
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
  public refname(): RefnameContext {
    return this.getTypedRuleContext(RefnameContext, 0) as RefnameContext;
  }
  public OID(): TerminalNode {
    return this.getToken(reversionParser.OID, 0);
  }
  public rev(): RevContext {
    return this.getTypedRuleContext(RevContext, 0) as RevContext;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_rev;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRev) {
      listener.enterRev(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRev) {
      listener.exitRev(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRev) {
      return visitor.visitRev(this);
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
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
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
  public get ruleIndex(): number {
    return reversionParser.RULE_rev_expression;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRev_expression) {
      listener.enterRev_expression(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRev_expression) {
      listener.exitRev_expression(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRev_expression) {
      return visitor.visitRev_expression(this);
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
  public SIGNED_DIGIT(): TerminalNode {
    return this.getToken(reversionParser.SIGNED_DIGIT, 0);
  }
  public ref_anchor(): Ref_anchorContext {
    return this.getTypedRuleContext(Ref_anchorContext, 0) as Ref_anchorContext;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_rev_position;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRev_position) {
      listener.enterRev_position(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRev_position) {
      listener.exitRev_position(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRev_position) {
      return visitor.visitRev_position(this);
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
  public date(): DateContext {
    return this.getTypedRuleContext(DateContext, 0) as DateContext;
  }
  public SIGNED_DIGIT(): TerminalNode {
    return this.getToken(reversionParser.SIGNED_DIGIT, 0);
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public iso_8601(): Iso_8601Context {
    return this.getTypedRuleContext(Iso_8601Context, 0) as Iso_8601Context;
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_ref_anchor;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterRef_anchor) {
      listener.enterRef_anchor(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitRef_anchor) {
      listener.exitRef_anchor(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitRef_anchor) {
      return visitor.visitRef_anchor(this);
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

export class Time_pointContext extends ParserRuleContext {
  constructor(
    parser?: reversionParser,
    parent?: ParserRuleContext,
    invokingState?: number,
  ) {
    super(parent, invokingState);
    this.parser = parser;
  }
  public SPACE(): TerminalNode {
    return this.getToken(reversionParser.SPACE, 0);
  }
  public TIME_UINT(): TerminalNode {
    return this.getToken(reversionParser.TIME_UINT, 0);
  }
  public TIME_VALUE(): TerminalNode {
    return this.getToken(reversionParser.TIME_VALUE, 0);
  }
  public DIGIT(): TerminalNode {
    return this.getToken(reversionParser.DIGIT, 0);
  }
  public get ruleIndex(): number {
    return reversionParser.RULE_time_point;
  }
  public enterRule(listener: reversionListener): void {
    if (listener.enterTime_point) {
      listener.enterTime_point(this);
    }
  }
  public exitRule(listener: reversionListener): void {
    if (listener.exitTime_point) {
      listener.exitTime_point(this);
    }
  }
  // @Override
  public accept<Result>(visitor: reversionVisitor<Result>): Result {
    if (visitor.visitTime_point) {
      return visitor.visitTime_point(this);
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
