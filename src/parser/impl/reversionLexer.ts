// Generated from reversion.g4 by ANTLR 4.13.0
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols
import {
  ATN,
  ATNDeserializer,
  CharStream,
  DFA,
  DecisionState,
  Lexer,
  LexerATNSimulator,
  PredictionContextCache,
  RuleContext,
  Token,
} from 'antlr4';

// @ts-ignore

export default class reversionLexer extends Lexer {
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

  public static readonly channelNames: string[] = [
    'DEFAULT_TOKEN_CHANNEL',
    'HIDDEN',
  ];
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
  public static readonly modeNames: string[] = ['DEFAULT_MODE'];

  public static readonly ruleNames: string[] = [
    'T__0',
    'T__1',
    'T__2',
    'T__3',
    'T__4',
    'T__5',
    'T__6',
    'T__7',
    'T__8',
    'T__9',
    'T__10',
    'T__11',
    'T__12',
    'T__13',
    'T__14',
    'T__15',
    'T__16',
    'T__17',
    'T__18',
    'T__19',
    'T__20',
    'T__21',
    'T__22',
    'T__23',
    'T__24',
    'T__25',
    'T__26',
    'T__27',
    'T__28',
    'T__29',
    'T__30',
    'T__31',
    'T__32',
    'T__33',
    'T__34',
    'T__35',
    'T__36',
    'T__37',
    'T__38',
    'T__39',
    'T__40',
    'T__41',
    'T__42',
    'T__43',
    'T__44',
    'T__45',
    'T__46',
    'T__47',
    'T__48',
    'T__49',
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

  constructor(input: CharStream) {
    super(input);
    this._interp = new LexerATNSimulator(
      this,
      reversionLexer._ATN,
      reversionLexer.DecisionsToDFA,
      new PredictionContextCache(),
    );
  }

  public get grammarFileName(): string {
    return 'reversion.g4';
  }

  public get literalNames(): (string | null)[] {
    return reversionLexer.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return reversionLexer.symbolicNames;
  }
  public get ruleNames(): string[] {
    return reversionLexer.ruleNames;
  }

  public get serializedATN(): number[] {
    return reversionLexer._serializedATN;
  }

  public get channelNames(): string[] {
    return reversionLexer.channelNames;
  }

  public get modeNames(): string[] {
    return reversionLexer.modeNames;
  }

  public static readonly _serializedATN: number[] = [
    4, 0, 66, 492, 6, -1, 2, 0, 7, 0, 2, 1, 7, 1, 2, 2, 7, 2, 2, 3, 7, 3, 2, 4,
    7, 4, 2, 5, 7, 5, 2, 6, 7, 6, 2, 7, 7, 7, 2, 8, 7, 8, 2, 9, 7, 9, 2, 10, 7,
    10, 2, 11, 7, 11, 2, 12, 7, 12, 2, 13, 7, 13, 2, 14, 7, 14, 2, 15, 7, 15, 2,
    16, 7, 16, 2, 17, 7, 17, 2, 18, 7, 18, 2, 19, 7, 19, 2, 20, 7, 20, 2, 21, 7,
    21, 2, 22, 7, 22, 2, 23, 7, 23, 2, 24, 7, 24, 2, 25, 7, 25, 2, 26, 7, 26, 2,
    27, 7, 27, 2, 28, 7, 28, 2, 29, 7, 29, 2, 30, 7, 30, 2, 31, 7, 31, 2, 32, 7,
    32, 2, 33, 7, 33, 2, 34, 7, 34, 2, 35, 7, 35, 2, 36, 7, 36, 2, 37, 7, 37, 2,
    38, 7, 38, 2, 39, 7, 39, 2, 40, 7, 40, 2, 41, 7, 41, 2, 42, 7, 42, 2, 43, 7,
    43, 2, 44, 7, 44, 2, 45, 7, 45, 2, 46, 7, 46, 2, 47, 7, 47, 2, 48, 7, 48, 2,
    49, 7, 49, 2, 50, 7, 50, 2, 51, 7, 51, 2, 52, 7, 52, 2, 53, 7, 53, 2, 54, 7,
    54, 2, 55, 7, 55, 2, 56, 7, 56, 2, 57, 7, 57, 2, 58, 7, 58, 2, 59, 7, 59, 2,
    60, 7, 60, 2, 61, 7, 61, 2, 62, 7, 62, 2, 63, 7, 63, 2, 64, 7, 64, 2, 65, 7,
    65, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2,
    1, 2, 1, 2, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 3, 1, 4, 1, 4, 1, 4, 1, 4, 1,
    4, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 6, 1, 6, 1, 6, 1, 6, 1, 6,
    1, 6, 1, 6, 1, 6, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 7, 1, 8, 1,
    8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 8, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9, 1, 9,
    1, 9, 1, 9, 1, 10, 1, 10, 1, 10, 1, 10, 1, 10, 1, 11, 1, 11, 1, 11, 1, 12,
    1, 12, 1, 12, 1, 12, 1, 13, 1, 13, 1, 14, 1, 14, 1, 14, 1, 14, 1, 14, 1, 15,
    1, 15, 1, 16, 1, 16, 1, 16, 1, 17, 1, 17, 1, 18, 1, 18, 1, 19, 1, 19, 1, 20,
    1, 20, 1, 21, 1, 21, 1, 22, 1, 22, 1, 23, 1, 23, 1, 24, 1, 24, 1, 24, 1, 24,
    1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 24, 1, 25, 1, 25, 1, 25, 1, 25, 1, 25,
    1, 25, 1, 26, 1, 26, 1, 26, 1, 26, 1, 27, 1, 27, 1, 27, 1, 27, 1, 28, 1, 28,
    1, 28, 1, 28, 1, 28, 1, 28, 1, 29, 1, 29, 1, 29, 1, 29, 1, 29, 1, 30, 1, 30,
    1, 30, 1, 30, 1, 30, 1, 31, 1, 31, 1, 31, 1, 31, 1, 32, 1, 32, 1, 32, 1, 32,
    1, 32, 1, 32, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 33, 1, 34, 1, 34, 1, 34,
    1, 34, 1, 34, 1, 35, 1, 35, 1, 35, 1, 35, 1, 36, 1, 36, 1, 36, 1, 36, 1, 36,
    1, 36, 1, 36, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 37, 1, 38, 1, 38,
    1, 38, 1, 38, 1, 38, 1, 39, 1, 39, 1, 39, 1, 39, 1, 40, 1, 40, 1, 40, 1, 40,
    1, 40, 1, 41, 1, 41, 1, 41, 1, 41, 1, 41, 1, 41, 1, 42, 1, 42, 1, 42, 1, 42,
    1, 42, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 43, 1, 44, 1, 44,
    1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 44, 1, 45, 1, 45, 1, 45, 1, 45, 1, 45,
    1, 45, 1, 46, 1, 46, 1, 46, 1, 46, 1, 46, 1, 47, 1, 47, 1, 47, 1, 47, 1, 47,
    1, 47, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 48, 1, 49, 1, 49, 1, 49,
    1, 49, 1, 49, 1, 49, 1, 50, 1, 50, 1, 50, 1, 50, 1, 50, 1, 50, 1, 50, 1, 50,
    3, 50, 394, 8, 50, 1, 51, 1, 51, 1, 51, 1, 52, 4, 52, 400, 8, 52, 11, 52,
    12, 52, 401, 1, 53, 1, 53, 3, 53, 406, 8, 53, 1, 54, 1, 54, 1, 54, 1, 54, 1,
    54, 1, 54, 1, 54, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1,
    55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1,
    55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1,
    55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1, 55, 1,
    56, 1, 56, 1, 56, 1, 56, 1, 56, 1, 56, 1, 57, 1, 57, 1, 57, 1, 57, 1, 57, 1,
    57, 1, 58, 1, 58, 1, 59, 1, 59, 1, 60, 1, 60, 3, 60, 474, 8, 60, 1, 61, 1,
    61, 1, 61, 1, 62, 1, 62, 1, 62, 1, 63, 1, 63, 1, 64, 1, 64, 1, 65, 4, 65,
    487, 8, 65, 11, 65, 12, 65, 488, 1, 65, 1, 65, 0, 0, 66, 1, 1, 3, 2, 5, 3,
    7, 4, 9, 5, 11, 6, 13, 7, 15, 8, 17, 9, 19, 10, 21, 11, 23, 12, 25, 13, 27,
    14, 29, 15, 31, 16, 33, 17, 35, 18, 37, 19, 39, 20, 41, 21, 43, 22, 45, 23,
    47, 24, 49, 25, 51, 26, 53, 27, 55, 28, 57, 29, 59, 30, 61, 31, 63, 32, 65,
    33, 67, 34, 69, 35, 71, 36, 73, 37, 75, 38, 77, 39, 79, 40, 81, 41, 83, 42,
    85, 43, 87, 44, 89, 45, 91, 46, 93, 47, 95, 48, 97, 49, 99, 50, 101, 51,
    103, 52, 105, 53, 107, 54, 109, 55, 111, 56, 113, 57, 115, 58, 117, 59, 119,
    60, 121, 61, 123, 62, 125, 63, 127, 64, 129, 65, 131, 66, 1, 0, 5, 2, 0, 43,
    43, 45, 45, 1, 0, 48, 57, 2, 0, 90, 90, 122, 122, 2, 0, 48, 57, 97, 122, 2,
    0, 10, 10, 13, 13, 496, 0, 1, 1, 0, 0, 0, 0, 3, 1, 0, 0, 0, 0, 5, 1, 0, 0,
    0, 0, 7, 1, 0, 0, 0, 0, 9, 1, 0, 0, 0, 0, 11, 1, 0, 0, 0, 0, 13, 1, 0, 0, 0,
    0, 15, 1, 0, 0, 0, 0, 17, 1, 0, 0, 0, 0, 19, 1, 0, 0, 0, 0, 21, 1, 0, 0, 0,
    0, 23, 1, 0, 0, 0, 0, 25, 1, 0, 0, 0, 0, 27, 1, 0, 0, 0, 0, 29, 1, 0, 0, 0,
    0, 31, 1, 0, 0, 0, 0, 33, 1, 0, 0, 0, 0, 35, 1, 0, 0, 0, 0, 37, 1, 0, 0, 0,
    0, 39, 1, 0, 0, 0, 0, 41, 1, 0, 0, 0, 0, 43, 1, 0, 0, 0, 0, 45, 1, 0, 0, 0,
    0, 47, 1, 0, 0, 0, 0, 49, 1, 0, 0, 0, 0, 51, 1, 0, 0, 0, 0, 53, 1, 0, 0, 0,
    0, 55, 1, 0, 0, 0, 0, 57, 1, 0, 0, 0, 0, 59, 1, 0, 0, 0, 0, 61, 1, 0, 0, 0,
    0, 63, 1, 0, 0, 0, 0, 65, 1, 0, 0, 0, 0, 67, 1, 0, 0, 0, 0, 69, 1, 0, 0, 0,
    0, 71, 1, 0, 0, 0, 0, 73, 1, 0, 0, 0, 0, 75, 1, 0, 0, 0, 0, 77, 1, 0, 0, 0,
    0, 79, 1, 0, 0, 0, 0, 81, 1, 0, 0, 0, 0, 83, 1, 0, 0, 0, 0, 85, 1, 0, 0, 0,
    0, 87, 1, 0, 0, 0, 0, 89, 1, 0, 0, 0, 0, 91, 1, 0, 0, 0, 0, 93, 1, 0, 0, 0,
    0, 95, 1, 0, 0, 0, 0, 97, 1, 0, 0, 0, 0, 99, 1, 0, 0, 0, 0, 101, 1, 0, 0, 0,
    0, 103, 1, 0, 0, 0, 0, 105, 1, 0, 0, 0, 0, 107, 1, 0, 0, 0, 0, 109, 1, 0, 0,
    0, 0, 111, 1, 0, 0, 0, 0, 113, 1, 0, 0, 0, 0, 115, 1, 0, 0, 0, 0, 117, 1, 0,
    0, 0, 0, 119, 1, 0, 0, 0, 0, 121, 1, 0, 0, 0, 0, 123, 1, 0, 0, 0, 0, 125, 1,
    0, 0, 0, 0, 127, 1, 0, 0, 0, 0, 129, 1, 0, 0, 0, 0, 131, 1, 0, 0, 0, 1, 133,
    1, 0, 0, 0, 3, 139, 1, 0, 0, 0, 5, 141, 1, 0, 0, 0, 7, 147, 1, 0, 0, 0, 9,
    153, 1, 0, 0, 0, 11, 158, 1, 0, 0, 0, 13, 165, 1, 0, 0, 0, 15, 173, 1, 0, 0,
    0, 17, 181, 1, 0, 0, 0, 19, 188, 1, 0, 0, 0, 21, 197, 1, 0, 0, 0, 23, 202,
    1, 0, 0, 0, 25, 205, 1, 0, 0, 0, 27, 209, 1, 0, 0, 0, 29, 211, 1, 0, 0, 0,
    31, 216, 1, 0, 0, 0, 33, 218, 1, 0, 0, 0, 35, 221, 1, 0, 0, 0, 37, 223, 1,
    0, 0, 0, 39, 225, 1, 0, 0, 0, 41, 227, 1, 0, 0, 0, 43, 229, 1, 0, 0, 0, 45,
    231, 1, 0, 0, 0, 47, 233, 1, 0, 0, 0, 49, 235, 1, 0, 0, 0, 51, 245, 1, 0, 0,
    0, 53, 251, 1, 0, 0, 0, 55, 255, 1, 0, 0, 0, 57, 259, 1, 0, 0, 0, 59, 265,
    1, 0, 0, 0, 61, 270, 1, 0, 0, 0, 63, 275, 1, 0, 0, 0, 65, 279, 1, 0, 0, 0,
    67, 285, 1, 0, 0, 0, 69, 291, 1, 0, 0, 0, 71, 296, 1, 0, 0, 0, 73, 300, 1,
    0, 0, 0, 75, 307, 1, 0, 0, 0, 77, 314, 1, 0, 0, 0, 79, 319, 1, 0, 0, 0, 81,
    323, 1, 0, 0, 0, 83, 328, 1, 0, 0, 0, 85, 334, 1, 0, 0, 0, 87, 339, 1, 0, 0,
    0, 89, 347, 1, 0, 0, 0, 91, 355, 1, 0, 0, 0, 93, 361, 1, 0, 0, 0, 95, 366,
    1, 0, 0, 0, 97, 372, 1, 0, 0, 0, 99, 379, 1, 0, 0, 0, 101, 393, 1, 0, 0, 0,
    103, 395, 1, 0, 0, 0, 105, 399, 1, 0, 0, 0, 107, 405, 1, 0, 0, 0, 109, 407,
    1, 0, 0, 0, 111, 414, 1, 0, 0, 0, 113, 455, 1, 0, 0, 0, 115, 461, 1, 0, 0,
    0, 117, 467, 1, 0, 0, 0, 119, 469, 1, 0, 0, 0, 121, 473, 1, 0, 0, 0, 123,
    475, 1, 0, 0, 0, 125, 478, 1, 0, 0, 0, 127, 481, 1, 0, 0, 0, 129, 483, 1, 0,
    0, 0, 131, 486, 1, 0, 0, 0, 133, 134, 5, 115, 0, 0, 134, 135, 5, 105, 0, 0,
    135, 136, 5, 110, 0, 0, 136, 137, 5, 99, 0, 0, 137, 138, 5, 101, 0, 0, 138,
    2, 1, 0, 0, 0, 139, 140, 5, 61, 0, 0, 140, 4, 1, 0, 0, 0, 141, 142, 5, 117,
    0, 0, 142, 143, 5, 110, 0, 0, 143, 144, 5, 116, 0, 0, 144, 145, 5, 105, 0,
    0, 145, 146, 5, 108, 0, 0, 146, 6, 1, 0, 0, 0, 147, 148, 5, 97, 0, 0, 148,
    149, 5, 102, 0, 0, 149, 150, 5, 116, 0, 0, 150, 151, 5, 101, 0, 0, 151, 152,
    5, 114, 0, 0, 152, 8, 1, 0, 0, 0, 153, 154, 5, 115, 0, 0, 154, 155, 5, 107,
    0, 0, 155, 156, 5, 105, 0, 0, 156, 157, 5, 112, 0, 0, 157, 10, 1, 0, 0, 0,
    158, 159, 5, 98, 0, 0, 159, 160, 5, 101, 0, 0, 160, 161, 5, 102, 0, 0, 161,
    162, 5, 111, 0, 0, 162, 163, 5, 114, 0, 0, 163, 164, 5, 101, 0, 0, 164, 12,
    1, 0, 0, 0, 165, 166, 5, 109, 0, 0, 166, 167, 5, 97, 0, 0, 167, 168, 5, 120,
    0, 0, 168, 169, 5, 45, 0, 0, 169, 170, 5, 97, 0, 0, 170, 171, 5, 103, 0, 0,
    171, 172, 5, 101, 0, 0, 172, 14, 1, 0, 0, 0, 173, 174, 5, 109, 0, 0, 174,
    175, 5, 105, 0, 0, 175, 176, 5, 110, 0, 0, 176, 177, 5, 45, 0, 0, 177, 178,
    5, 97, 0, 0, 178, 179, 5, 103, 0, 0, 179, 180, 5, 101, 0, 0, 180, 16, 1, 0,
    0, 0, 181, 182, 5, 97, 0, 0, 182, 183, 5, 117, 0, 0, 183, 184, 5, 116, 0, 0,
    184, 185, 5, 104, 0, 0, 185, 186, 5, 111, 0, 0, 186, 187, 5, 114, 0, 0, 187,
    18, 1, 0, 0, 0, 188, 189, 5, 99, 0, 0, 189, 190, 5, 111, 0, 0, 190, 191, 5,
    109, 0, 0, 191, 192, 5, 109, 0, 0, 192, 193, 5, 105, 0, 0, 193, 194, 5, 116,
    0, 0, 194, 195, 5, 101, 0, 0, 195, 196, 5, 114, 0, 0, 196, 20, 1, 0, 0, 0,
    197, 198, 5, 103, 0, 0, 198, 199, 5, 114, 0, 0, 199, 200, 5, 101, 0, 0, 200,
    201, 5, 112, 0, 0, 201, 22, 1, 0, 0, 0, 202, 203, 5, 46, 0, 0, 203, 204, 5,
    46, 0, 0, 204, 24, 1, 0, 0, 0, 205, 206, 5, 46, 0, 0, 206, 207, 5, 46, 0, 0,
    207, 208, 5, 46, 0, 0, 208, 26, 1, 0, 0, 0, 209, 210, 5, 94, 0, 0, 210, 28,
    1, 0, 0, 0, 211, 212, 5, 72, 0, 0, 212, 213, 5, 69, 0, 0, 213, 214, 5, 65,
    0, 0, 214, 215, 5, 68, 0, 0, 215, 30, 1, 0, 0, 0, 216, 217, 5, 64, 0, 0,
    217, 32, 1, 0, 0, 0, 218, 219, 5, 58, 0, 0, 219, 220, 5, 47, 0, 0, 220, 34,
    1, 0, 0, 0, 221, 222, 5, 58, 0, 0, 222, 36, 1, 0, 0, 0, 223, 224, 5, 33, 0,
    0, 224, 38, 1, 0, 0, 0, 225, 226, 5, 45, 0, 0, 226, 40, 1, 0, 0, 0, 227,
    228, 5, 123, 0, 0, 228, 42, 1, 0, 0, 0, 229, 230, 5, 125, 0, 0, 230, 44, 1,
    0, 0, 0, 231, 232, 5, 126, 0, 0, 232, 46, 1, 0, 0, 0, 233, 234, 5, 47, 0, 0,
    234, 48, 1, 0, 0, 0, 235, 236, 5, 121, 0, 0, 236, 237, 5, 101, 0, 0, 237,
    238, 5, 115, 0, 0, 238, 239, 5, 116, 0, 0, 239, 240, 5, 101, 0, 0, 240, 241,
    5, 114, 0, 0, 241, 242, 5, 100, 0, 0, 242, 243, 5, 97, 0, 0, 243, 244, 5,
    121, 0, 0, 244, 50, 1, 0, 0, 0, 245, 246, 5, 116, 0, 0, 246, 247, 5, 111, 0,
    0, 247, 248, 5, 100, 0, 0, 248, 249, 5, 97, 0, 0, 249, 250, 5, 121, 0, 0,
    250, 52, 1, 0, 0, 0, 251, 252, 5, 111, 0, 0, 252, 253, 5, 110, 0, 0, 253,
    254, 5, 101, 0, 0, 254, 54, 1, 0, 0, 0, 255, 256, 5, 116, 0, 0, 256, 257, 5,
    119, 0, 0, 257, 258, 5, 111, 0, 0, 258, 56, 1, 0, 0, 0, 259, 260, 5, 116, 0,
    0, 260, 261, 5, 104, 0, 0, 261, 262, 5, 114, 0, 0, 262, 263, 5, 101, 0, 0,
    263, 264, 5, 101, 0, 0, 264, 58, 1, 0, 0, 0, 265, 266, 5, 102, 0, 0, 266,
    267, 5, 111, 0, 0, 267, 268, 5, 117, 0, 0, 268, 269, 5, 114, 0, 0, 269, 60,
    1, 0, 0, 0, 270, 271, 5, 102, 0, 0, 271, 272, 5, 105, 0, 0, 272, 273, 5,
    118, 0, 0, 273, 274, 5, 101, 0, 0, 274, 62, 1, 0, 0, 0, 275, 276, 5, 115, 0,
    0, 276, 277, 5, 105, 0, 0, 277, 278, 5, 120, 0, 0, 278, 64, 1, 0, 0, 0, 279,
    280, 5, 115, 0, 0, 280, 281, 5, 101, 0, 0, 281, 282, 5, 118, 0, 0, 282, 283,
    5, 101, 0, 0, 283, 284, 5, 110, 0, 0, 284, 66, 1, 0, 0, 0, 285, 286, 5, 101,
    0, 0, 286, 287, 5, 105, 0, 0, 287, 288, 5, 103, 0, 0, 288, 289, 5, 104, 0,
    0, 289, 290, 5, 116, 0, 0, 290, 68, 1, 0, 0, 0, 291, 292, 5, 110, 0, 0, 292,
    293, 5, 105, 0, 0, 293, 294, 5, 110, 0, 0, 294, 295, 5, 101, 0, 0, 295, 70,
    1, 0, 0, 0, 296, 297, 5, 116, 0, 0, 297, 298, 5, 101, 0, 0, 298, 299, 5,
    110, 0, 0, 299, 72, 1, 0, 0, 0, 300, 301, 5, 115, 0, 0, 301, 302, 5, 101, 0,
    0, 302, 303, 5, 99, 0, 0, 303, 304, 5, 111, 0, 0, 304, 305, 5, 110, 0, 0,
    305, 306, 5, 100, 0, 0, 306, 74, 1, 0, 0, 0, 307, 308, 5, 109, 0, 0, 308,
    309, 5, 105, 0, 0, 309, 310, 5, 110, 0, 0, 310, 311, 5, 117, 0, 0, 311, 312,
    5, 116, 0, 0, 312, 313, 5, 101, 0, 0, 313, 76, 1, 0, 0, 0, 314, 315, 5, 104,
    0, 0, 315, 316, 5, 111, 0, 0, 316, 317, 5, 117, 0, 0, 317, 318, 5, 114, 0,
    0, 318, 78, 1, 0, 0, 0, 319, 320, 5, 100, 0, 0, 320, 321, 5, 97, 0, 0, 321,
    322, 5, 121, 0, 0, 322, 80, 1, 0, 0, 0, 323, 324, 5, 119, 0, 0, 324, 325, 5,
    101, 0, 0, 325, 326, 5, 101, 0, 0, 326, 327, 5, 107, 0, 0, 327, 82, 1, 0, 0,
    0, 328, 329, 5, 109, 0, 0, 329, 330, 5, 111, 0, 0, 330, 331, 5, 110, 0, 0,
    331, 332, 5, 116, 0, 0, 332, 333, 5, 104, 0, 0, 333, 84, 1, 0, 0, 0, 334,
    335, 5, 121, 0, 0, 335, 336, 5, 101, 0, 0, 336, 337, 5, 97, 0, 0, 337, 338,
    5, 114, 0, 0, 338, 86, 1, 0, 0, 0, 339, 340, 5, 115, 0, 0, 340, 341, 5, 101,
    0, 0, 341, 342, 5, 99, 0, 0, 342, 343, 5, 111, 0, 0, 343, 344, 5, 110, 0, 0,
    344, 345, 5, 100, 0, 0, 345, 346, 5, 115, 0, 0, 346, 88, 1, 0, 0, 0, 347,
    348, 5, 109, 0, 0, 348, 349, 5, 105, 0, 0, 349, 350, 5, 110, 0, 0, 350, 351,
    5, 117, 0, 0, 351, 352, 5, 116, 0, 0, 352, 353, 5, 101, 0, 0, 353, 354, 5,
    115, 0, 0, 354, 90, 1, 0, 0, 0, 355, 356, 5, 104, 0, 0, 356, 357, 5, 111, 0,
    0, 357, 358, 5, 117, 0, 0, 358, 359, 5, 114, 0, 0, 359, 360, 5, 115, 0, 0,
    360, 92, 1, 0, 0, 0, 361, 362, 5, 100, 0, 0, 362, 363, 5, 97, 0, 0, 363,
    364, 5, 121, 0, 0, 364, 365, 5, 115, 0, 0, 365, 94, 1, 0, 0, 0, 366, 367, 5,
    119, 0, 0, 367, 368, 5, 101, 0, 0, 368, 369, 5, 101, 0, 0, 369, 370, 5, 107,
    0, 0, 370, 371, 5, 115, 0, 0, 371, 96, 1, 0, 0, 0, 372, 373, 5, 109, 0, 0,
    373, 374, 5, 111, 0, 0, 374, 375, 5, 110, 0, 0, 375, 376, 5, 116, 0, 0, 376,
    377, 5, 104, 0, 0, 377, 378, 5, 115, 0, 0, 378, 98, 1, 0, 0, 0, 379, 380, 5,
    121, 0, 0, 380, 381, 5, 101, 0, 0, 381, 382, 5, 97, 0, 0, 382, 383, 5, 114,
    0, 0, 383, 384, 5, 115, 0, 0, 384, 100, 1, 0, 0, 0, 385, 386, 5, 97, 0, 0,
    386, 387, 5, 103, 0, 0, 387, 394, 5, 111, 0, 0, 388, 389, 5, 97, 0, 0, 389,
    390, 5, 102, 0, 0, 390, 391, 5, 116, 0, 0, 391, 392, 5, 101, 0, 0, 392, 394,
    5, 114, 0, 0, 393, 385, 1, 0, 0, 0, 393, 388, 1, 0, 0, 0, 394, 102, 1, 0, 0,
    0, 395, 396, 7, 0, 0, 0, 396, 397, 3, 105, 52, 0, 397, 104, 1, 0, 0, 0, 398,
    400, 7, 1, 0, 0, 399, 398, 1, 0, 0, 0, 400, 401, 1, 0, 0, 0, 401, 399, 1, 0,
    0, 0, 401, 402, 1, 0, 0, 0, 402, 106, 1, 0, 0, 0, 403, 406, 3, 109, 54, 0,
    404, 406, 3, 111, 55, 0, 405, 403, 1, 0, 0, 0, 405, 404, 1, 0, 0, 0, 406,
    108, 1, 0, 0, 0, 407, 408, 3, 129, 64, 0, 408, 409, 3, 129, 64, 0, 409, 410,
    3, 129, 64, 0, 410, 411, 3, 129, 64, 0, 411, 412, 3, 129, 64, 0, 412, 413,
    3, 129, 64, 0, 413, 110, 1, 0, 0, 0, 414, 415, 3, 129, 64, 0, 415, 416, 3,
    129, 64, 0, 416, 417, 3, 129, 64, 0, 417, 418, 3, 129, 64, 0, 418, 419, 3,
    129, 64, 0, 419, 420, 3, 129, 64, 0, 420, 421, 3, 129, 64, 0, 421, 422, 3,
    129, 64, 0, 422, 423, 3, 129, 64, 0, 423, 424, 3, 129, 64, 0, 424, 425, 3,
    129, 64, 0, 425, 426, 3, 129, 64, 0, 426, 427, 3, 129, 64, 0, 427, 428, 3,
    129, 64, 0, 428, 429, 3, 129, 64, 0, 429, 430, 3, 129, 64, 0, 430, 431, 3,
    129, 64, 0, 431, 432, 3, 129, 64, 0, 432, 433, 3, 129, 64, 0, 433, 434, 3,
    129, 64, 0, 434, 435, 3, 129, 64, 0, 435, 436, 3, 129, 64, 0, 436, 437, 3,
    129, 64, 0, 437, 438, 3, 129, 64, 0, 438, 439, 3, 129, 64, 0, 439, 440, 3,
    129, 64, 0, 440, 441, 3, 129, 64, 0, 441, 442, 3, 129, 64, 0, 442, 443, 3,
    129, 64, 0, 443, 444, 3, 129, 64, 0, 444, 445, 3, 129, 64, 0, 445, 446, 3,
    129, 64, 0, 446, 447, 3, 129, 64, 0, 447, 448, 3, 129, 64, 0, 448, 449, 3,
    129, 64, 0, 449, 450, 3, 129, 64, 0, 450, 451, 3, 129, 64, 0, 451, 452, 3,
    129, 64, 0, 452, 453, 3, 129, 64, 0, 453, 454, 3, 129, 64, 0, 454, 112, 1,
    0, 0, 0, 455, 456, 3, 125, 62, 0, 456, 457, 5, 45, 0, 0, 457, 458, 3, 121,
    60, 0, 458, 459, 5, 45, 0, 0, 459, 460, 3, 121, 60, 0, 460, 114, 1, 0, 0, 0,
    461, 462, 3, 121, 60, 0, 462, 463, 5, 58, 0, 0, 463, 464, 3, 121, 60, 0,
    464, 465, 5, 58, 0, 0, 465, 466, 3, 121, 60, 0, 466, 116, 1, 0, 0, 0, 467,
    468, 7, 2, 0, 0, 468, 118, 1, 0, 0, 0, 469, 470, 5, 32, 0, 0, 470, 120, 1,
    0, 0, 0, 471, 474, 7, 1, 0, 0, 472, 474, 3, 123, 61, 0, 473, 471, 1, 0, 0,
    0, 473, 472, 1, 0, 0, 0, 474, 122, 1, 0, 0, 0, 475, 476, 7, 1, 0, 0, 476,
    477, 7, 1, 0, 0, 477, 124, 1, 0, 0, 0, 478, 479, 3, 123, 61, 0, 479, 480, 3,
    123, 61, 0, 480, 126, 1, 0, 0, 0, 481, 482, 9, 0, 0, 0, 482, 128, 1, 0, 0,
    0, 483, 484, 7, 3, 0, 0, 484, 130, 1, 0, 0, 0, 485, 487, 7, 4, 0, 0, 486,
    485, 1, 0, 0, 0, 487, 488, 1, 0, 0, 0, 488, 486, 1, 0, 0, 0, 488, 489, 1, 0,
    0, 0, 489, 490, 1, 0, 0, 0, 490, 491, 6, 65, 0, 0, 491, 132, 1, 0, 0, 0, 6,
    0, 393, 401, 405, 473, 488, 1, 6, 0, 0,
  ];

  private static __ATN: ATN;
  public static get _ATN(): ATN {
    if (!reversionLexer.__ATN) {
      reversionLexer.__ATN = new ATNDeserializer().deserialize(
        reversionLexer._serializedATN,
      );
    }

    return reversionLexer.__ATN;
  }

  static DecisionsToDFA = reversionLexer._ATN.decisionToState.map(
    (ds: DecisionState, index: number) => new DFA(ds, index),
  );
}
