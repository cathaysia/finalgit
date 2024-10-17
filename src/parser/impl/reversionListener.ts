// Generated from reversion.g4 by ANTLR 4.13.0

import { ParseTreeListener } from 'antlr4';

// @ts-ignore

import { ReversionContext } from './reversionParser';
import { RevAfterContext } from './reversionParser';
import { RevUntilContext } from './reversionParser';
import { RevSkipContext } from './reversionParser';
import { RevRangeBefore2Context } from './reversionParser';
import { RevRangeBefore1Context } from './reversionParser';
import { RevSingleContext } from './reversionParser';
import { RevBeforeContext } from './reversionParser';
import { RevSinceContext } from './reversionParser';
import { RevRangeAfter1Context } from './reversionParser';
import { RevAuthorContext } from './reversionParser';
import { RevExcludeContext } from './reversionParser';
import { RevRange1Context } from './reversionParser';
import { RevRangeAfter2Context } from './reversionParser';
import { RevCommiterContext } from './reversionParser';
import { RevGrepContext } from './reversionParser';
import { RevExpressionContext } from './reversionParser';
import { RevMaxAgeContext } from './reversionParser';
import { RevMultiContext } from './reversionParser';
import { RevMinAgeContext } from './reversionParser';
import { RevRange2Context } from './reversionParser';
import { RefNameContext } from './reversionParser';
import { RefOIDContext } from './reversionParser';
import { RefExcludeContext } from './reversionParser';
import { RefnameContext } from './reversionParser';
import { ExprPosContext } from './reversionParser';
import { ExprDigitContext } from './reversionParser';
import { ExprTextContext } from './reversionParser';
import { ExprRevTextContext } from './reversionParser';
import { ExprDigitTextContext } from './reversionParser';
import { PosHeadContext } from './reversionParser';
import { PosExcludeContext } from './reversionParser';
import { PosNegContext } from './reversionParser';
import { PosReverseContext } from './reversionParser';
import { PosAnchorContext } from './reversionParser';
import { Rev_directionContext } from './reversionParser';
import { AnchorDateContext } from './reversionParser';
import { AnchorSignedDigitContext } from './reversionParser';
import { AnchorDigitContext } from './reversionParser';
import { AnchorTextContext } from './reversionParser';
import { AnchorIsoContext } from './reversionParser';
import { DateYesterdayContext } from './reversionParser';
import { DateTodayContext } from './reversionParser';
import { DateIso8601Context } from './reversionParser';
import { DateTimePointContext } from './reversionParser';
import { TimePointValueContext } from './reversionParser';
import { TimePointDigitContext } from './reversionParser';
import { Time_valueContext } from './reversionParser';
import { Time_unitContext } from './reversionParser';
import { Iso_8601Context } from './reversionParser';

/**
 * This interface defines a complete listener for a parse tree produced by
 * `reversionParser`.
 */
export default class reversionListener extends ParseTreeListener {
  /**
   * Enter a parse tree produced by `reversionParser.reversion`.
   * @param ctx the parse tree
   */
  enterReversion?: (ctx: ReversionContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.reversion`.
   * @param ctx the parse tree
   */
  exitReversion?: (ctx: ReversionContext) => void;
  /**
   * Enter a parse tree produced by the `revAfter`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevAfter?: (ctx: RevAfterContext) => void;
  /**
   * Exit a parse tree produced by the `revAfter`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevAfter?: (ctx: RevAfterContext) => void;
  /**
   * Enter a parse tree produced by the `revUntil`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevUntil?: (ctx: RevUntilContext) => void;
  /**
   * Exit a parse tree produced by the `revUntil`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevUntil?: (ctx: RevUntilContext) => void;
  /**
   * Enter a parse tree produced by the `revSkip`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevSkip?: (ctx: RevSkipContext) => void;
  /**
   * Exit a parse tree produced by the `revSkip`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevSkip?: (ctx: RevSkipContext) => void;
  /**
   * Enter a parse tree produced by the `revRangeBefore2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevRangeBefore2?: (ctx: RevRangeBefore2Context) => void;
  /**
   * Exit a parse tree produced by the `revRangeBefore2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevRangeBefore2?: (ctx: RevRangeBefore2Context) => void;
  /**
   * Enter a parse tree produced by the `revRangeBefore1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevRangeBefore1?: (ctx: RevRangeBefore1Context) => void;
  /**
   * Exit a parse tree produced by the `revRangeBefore1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevRangeBefore1?: (ctx: RevRangeBefore1Context) => void;
  /**
   * Enter a parse tree produced by the `revSingle`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevSingle?: (ctx: RevSingleContext) => void;
  /**
   * Exit a parse tree produced by the `revSingle`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevSingle?: (ctx: RevSingleContext) => void;
  /**
   * Enter a parse tree produced by the `revBefore`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevBefore?: (ctx: RevBeforeContext) => void;
  /**
   * Exit a parse tree produced by the `revBefore`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevBefore?: (ctx: RevBeforeContext) => void;
  /**
   * Enter a parse tree produced by the `revSince`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevSince?: (ctx: RevSinceContext) => void;
  /**
   * Exit a parse tree produced by the `revSince`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevSince?: (ctx: RevSinceContext) => void;
  /**
   * Enter a parse tree produced by the `revRangeAfter1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevRangeAfter1?: (ctx: RevRangeAfter1Context) => void;
  /**
   * Exit a parse tree produced by the `revRangeAfter1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevRangeAfter1?: (ctx: RevRangeAfter1Context) => void;
  /**
   * Enter a parse tree produced by the `revAuthor`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevAuthor?: (ctx: RevAuthorContext) => void;
  /**
   * Exit a parse tree produced by the `revAuthor`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevAuthor?: (ctx: RevAuthorContext) => void;
  /**
   * Enter a parse tree produced by the `revExclude`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevExclude?: (ctx: RevExcludeContext) => void;
  /**
   * Exit a parse tree produced by the `revExclude`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevExclude?: (ctx: RevExcludeContext) => void;
  /**
   * Enter a parse tree produced by the `revRange1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevRange1?: (ctx: RevRange1Context) => void;
  /**
   * Exit a parse tree produced by the `revRange1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevRange1?: (ctx: RevRange1Context) => void;
  /**
   * Enter a parse tree produced by the `revRangeAfter2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevRangeAfter2?: (ctx: RevRangeAfter2Context) => void;
  /**
   * Exit a parse tree produced by the `revRangeAfter2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevRangeAfter2?: (ctx: RevRangeAfter2Context) => void;
  /**
   * Enter a parse tree produced by the `revCommiter`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevCommiter?: (ctx: RevCommiterContext) => void;
  /**
   * Exit a parse tree produced by the `revCommiter`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevCommiter?: (ctx: RevCommiterContext) => void;
  /**
   * Enter a parse tree produced by the `revGrep`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevGrep?: (ctx: RevGrepContext) => void;
  /**
   * Exit a parse tree produced by the `revGrep`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevGrep?: (ctx: RevGrepContext) => void;
  /**
   * Enter a parse tree produced by the `revExpression`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevExpression?: (ctx: RevExpressionContext) => void;
  /**
   * Exit a parse tree produced by the `revExpression`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevExpression?: (ctx: RevExpressionContext) => void;
  /**
   * Enter a parse tree produced by the `revMaxAge`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevMaxAge?: (ctx: RevMaxAgeContext) => void;
  /**
   * Exit a parse tree produced by the `revMaxAge`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevMaxAge?: (ctx: RevMaxAgeContext) => void;
  /**
   * Enter a parse tree produced by the `revMulti`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevMulti?: (ctx: RevMultiContext) => void;
  /**
   * Exit a parse tree produced by the `revMulti`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevMulti?: (ctx: RevMultiContext) => void;
  /**
   * Enter a parse tree produced by the `revMinAge`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevMinAge?: (ctx: RevMinAgeContext) => void;
  /**
   * Exit a parse tree produced by the `revMinAge`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevMinAge?: (ctx: RevMinAgeContext) => void;
  /**
   * Enter a parse tree produced by the `revRange2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRevRange2?: (ctx: RevRange2Context) => void;
  /**
   * Exit a parse tree produced by the `revRange2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRevRange2?: (ctx: RevRange2Context) => void;
  /**
   * Enter a parse tree produced by the `refName`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   */
  enterRefName?: (ctx: RefNameContext) => void;
  /**
   * Exit a parse tree produced by the `refName`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   */
  exitRefName?: (ctx: RefNameContext) => void;
  /**
   * Enter a parse tree produced by the `refOID`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   */
  enterRefOID?: (ctx: RefOIDContext) => void;
  /**
   * Exit a parse tree produced by the `refOID`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   */
  exitRefOID?: (ctx: RefOIDContext) => void;
  /**
   * Enter a parse tree produced by the `refExclude`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   */
  enterRefExclude?: (ctx: RefExcludeContext) => void;
  /**
   * Exit a parse tree produced by the `refExclude`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   */
  exitRefExclude?: (ctx: RefExcludeContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.refname`.
   * @param ctx the parse tree
   */
  enterRefname?: (ctx: RefnameContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.refname`.
   * @param ctx the parse tree
   */
  exitRefname?: (ctx: RefnameContext) => void;
  /**
   * Enter a parse tree produced by the `exprPos`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  enterExprPos?: (ctx: ExprPosContext) => void;
  /**
   * Exit a parse tree produced by the `exprPos`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  exitExprPos?: (ctx: ExprPosContext) => void;
  /**
   * Enter a parse tree produced by the `exprDigit`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  enterExprDigit?: (ctx: ExprDigitContext) => void;
  /**
   * Exit a parse tree produced by the `exprDigit`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  exitExprDigit?: (ctx: ExprDigitContext) => void;
  /**
   * Enter a parse tree produced by the `exprText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  enterExprText?: (ctx: ExprTextContext) => void;
  /**
   * Exit a parse tree produced by the `exprText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  exitExprText?: (ctx: ExprTextContext) => void;
  /**
   * Enter a parse tree produced by the `exprRevText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  enterExprRevText?: (ctx: ExprRevTextContext) => void;
  /**
   * Exit a parse tree produced by the `exprRevText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  exitExprRevText?: (ctx: ExprRevTextContext) => void;
  /**
   * Enter a parse tree produced by the `exprDigitText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  enterExprDigitText?: (ctx: ExprDigitTextContext) => void;
  /**
   * Exit a parse tree produced by the `exprDigitText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  exitExprDigitText?: (ctx: ExprDigitTextContext) => void;
  /**
   * Enter a parse tree produced by the `posHead`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  enterPosHead?: (ctx: PosHeadContext) => void;
  /**
   * Exit a parse tree produced by the `posHead`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  exitPosHead?: (ctx: PosHeadContext) => void;
  /**
   * Enter a parse tree produced by the `posExclude`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  enterPosExclude?: (ctx: PosExcludeContext) => void;
  /**
   * Exit a parse tree produced by the `posExclude`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  exitPosExclude?: (ctx: PosExcludeContext) => void;
  /**
   * Enter a parse tree produced by the `posNeg`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  enterPosNeg?: (ctx: PosNegContext) => void;
  /**
   * Exit a parse tree produced by the `posNeg`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  exitPosNeg?: (ctx: PosNegContext) => void;
  /**
   * Enter a parse tree produced by the `posReverse`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  enterPosReverse?: (ctx: PosReverseContext) => void;
  /**
   * Exit a parse tree produced by the `posReverse`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  exitPosReverse?: (ctx: PosReverseContext) => void;
  /**
   * Enter a parse tree produced by the `posAnchor`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  enterPosAnchor?: (ctx: PosAnchorContext) => void;
  /**
   * Exit a parse tree produced by the `posAnchor`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  exitPosAnchor?: (ctx: PosAnchorContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.rev_direction`.
   * @param ctx the parse tree
   */
  enterRev_direction?: (ctx: Rev_directionContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.rev_direction`.
   * @param ctx the parse tree
   */
  exitRev_direction?: (ctx: Rev_directionContext) => void;
  /**
   * Enter a parse tree produced by the `anchorDate`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  enterAnchorDate?: (ctx: AnchorDateContext) => void;
  /**
   * Exit a parse tree produced by the `anchorDate`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  exitAnchorDate?: (ctx: AnchorDateContext) => void;
  /**
   * Enter a parse tree produced by the `anchorSignedDigit`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  enterAnchorSignedDigit?: (ctx: AnchorSignedDigitContext) => void;
  /**
   * Exit a parse tree produced by the `anchorSignedDigit`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  exitAnchorSignedDigit?: (ctx: AnchorSignedDigitContext) => void;
  /**
   * Enter a parse tree produced by the `anchorDigit`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  enterAnchorDigit?: (ctx: AnchorDigitContext) => void;
  /**
   * Exit a parse tree produced by the `anchorDigit`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  exitAnchorDigit?: (ctx: AnchorDigitContext) => void;
  /**
   * Enter a parse tree produced by the `anchorText`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  enterAnchorText?: (ctx: AnchorTextContext) => void;
  /**
   * Exit a parse tree produced by the `anchorText`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  exitAnchorText?: (ctx: AnchorTextContext) => void;
  /**
   * Enter a parse tree produced by the `anchorIso`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  enterAnchorIso?: (ctx: AnchorIsoContext) => void;
  /**
   * Exit a parse tree produced by the `anchorIso`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  exitAnchorIso?: (ctx: AnchorIsoContext) => void;
  /**
   * Enter a parse tree produced by the `dateYesterday`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   */
  enterDateYesterday?: (ctx: DateYesterdayContext) => void;
  /**
   * Exit a parse tree produced by the `dateYesterday`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   */
  exitDateYesterday?: (ctx: DateYesterdayContext) => void;
  /**
   * Enter a parse tree produced by the `dateToday`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   */
  enterDateToday?: (ctx: DateTodayContext) => void;
  /**
   * Exit a parse tree produced by the `dateToday`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   */
  exitDateToday?: (ctx: DateTodayContext) => void;
  /**
   * Enter a parse tree produced by the `dateIso8601`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   */
  enterDateIso8601?: (ctx: DateIso8601Context) => void;
  /**
   * Exit a parse tree produced by the `dateIso8601`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   */
  exitDateIso8601?: (ctx: DateIso8601Context) => void;
  /**
   * Enter a parse tree produced by the `dateTimePoint`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   */
  enterDateTimePoint?: (ctx: DateTimePointContext) => void;
  /**
   * Exit a parse tree produced by the `dateTimePoint`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   */
  exitDateTimePoint?: (ctx: DateTimePointContext) => void;
  /**
   * Enter a parse tree produced by the `timePointValue`
   * labeled alternative in `reversionParser.time_point`.
   * @param ctx the parse tree
   */
  enterTimePointValue?: (ctx: TimePointValueContext) => void;
  /**
   * Exit a parse tree produced by the `timePointValue`
   * labeled alternative in `reversionParser.time_point`.
   * @param ctx the parse tree
   */
  exitTimePointValue?: (ctx: TimePointValueContext) => void;
  /**
   * Enter a parse tree produced by the `timePointDigit`
   * labeled alternative in `reversionParser.time_point`.
   * @param ctx the parse tree
   */
  enterTimePointDigit?: (ctx: TimePointDigitContext) => void;
  /**
   * Exit a parse tree produced by the `timePointDigit`
   * labeled alternative in `reversionParser.time_point`.
   * @param ctx the parse tree
   */
  exitTimePointDigit?: (ctx: TimePointDigitContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.time_value`.
   * @param ctx the parse tree
   */
  enterTime_value?: (ctx: Time_valueContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.time_value`.
   * @param ctx the parse tree
   */
  exitTime_value?: (ctx: Time_valueContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.time_unit`.
   * @param ctx the parse tree
   */
  enterTime_unit?: (ctx: Time_unitContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.time_unit`.
   * @param ctx the parse tree
   */
  exitTime_unit?: (ctx: Time_unitContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.iso_8601`.
   * @param ctx the parse tree
   */
  enterIso_8601?: (ctx: Iso_8601Context) => void;
  /**
   * Exit a parse tree produced by `reversionParser.iso_8601`.
   * @param ctx the parse tree
   */
  exitIso_8601?: (ctx: Iso_8601Context) => void;
}
