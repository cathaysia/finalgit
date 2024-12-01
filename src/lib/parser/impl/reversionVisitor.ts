// Generated from reversion.g4 by ANTLR 4.13.0

import { ParseTreeVisitor } from 'antlr4';

import type { ReversionContext } from './reversionParser';
import type { RevAfterContext } from './reversionParser';
import type { RevUntilContext } from './reversionParser';
import type { RevSkipContext } from './reversionParser';
import type { RevRangeBefore2Context } from './reversionParser';
import type { RevRangeBefore1Context } from './reversionParser';
import type { RevSingleContext } from './reversionParser';
import type { RevBeforeContext } from './reversionParser';
import type { RevSinceContext } from './reversionParser';
import type { RevRangeAfter1Context } from './reversionParser';
import type { RevAuthorContext } from './reversionParser';
import type { RevExcludeContext } from './reversionParser';
import type { RevRange1Context } from './reversionParser';
import type { RevRangeAfter2Context } from './reversionParser';
import type { RevCommiterContext } from './reversionParser';
import type { RevGrepContext } from './reversionParser';
import type { RevExpressionContext } from './reversionParser';
import type { RevMaxAgeContext } from './reversionParser';
import type { RevMultiContext } from './reversionParser';
import type { RevMinAgeContext } from './reversionParser';
import type { RevRange2Context } from './reversionParser';
import type { RefNameContext } from './reversionParser';
import type { RefOIDContext } from './reversionParser';
import type { RefExcludeContext } from './reversionParser';
import type { RefnameContext } from './reversionParser';
import type { ExprPosContext } from './reversionParser';
import type { ExprDigitContext } from './reversionParser';
import type { ExprTextContext } from './reversionParser';
import type { ExprRevTextContext } from './reversionParser';
import type { ExprDigitTextContext } from './reversionParser';
import type { PosHeadContext } from './reversionParser';
import type { PosExcludeContext } from './reversionParser';
import type { PosNegContext } from './reversionParser';
import type { PosReverseContext } from './reversionParser';
import type { PosAnchorContext } from './reversionParser';
import type { Rev_directionContext } from './reversionParser';
import type { AnchorDateContext } from './reversionParser';
import type { AnchorSignedDigitContext } from './reversionParser';
import type { AnchorDigitContext } from './reversionParser';
import type { AnchorTextContext } from './reversionParser';
import type { AnchorIsoContext } from './reversionParser';
import type { DateYesterdayContext } from './reversionParser';
import type { DateTodayContext } from './reversionParser';
import type { DateIso8601Context } from './reversionParser';
import type { DateTimePointContext } from './reversionParser';
import type { TimePointValueContext } from './reversionParser';
import type { TimePointDigitContext } from './reversionParser';
import type { Time_valueContext } from './reversionParser';
import type { Time_unitContext } from './reversionParser';
import type { Time_directionContext } from './reversionParser';
import type { Iso_8601Context } from './reversionParser';

/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `reversionParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export default class reversionVisitor<Result> extends ParseTreeVisitor<Result> {
  /**
   * Visit a parse tree produced by `reversionParser.reversion`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitReversion?: (ctx: ReversionContext) => Result;
  /**
   * Visit a parse tree produced by the `revAfter`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevAfter?: (ctx: RevAfterContext) => Result;
  /**
   * Visit a parse tree produced by the `revUntil`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevUntil?: (ctx: RevUntilContext) => Result;
  /**
   * Visit a parse tree produced by the `revSkip`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevSkip?: (ctx: RevSkipContext) => Result;
  /**
   * Visit a parse tree produced by the `revRangeBefore2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevRangeBefore2?: (ctx: RevRangeBefore2Context) => Result;
  /**
   * Visit a parse tree produced by the `revRangeBefore1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevRangeBefore1?: (ctx: RevRangeBefore1Context) => Result;
  /**
   * Visit a parse tree produced by the `revSingle`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevSingle?: (ctx: RevSingleContext) => Result;
  /**
   * Visit a parse tree produced by the `revBefore`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevBefore?: (ctx: RevBeforeContext) => Result;
  /**
   * Visit a parse tree produced by the `revSince`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevSince?: (ctx: RevSinceContext) => Result;
  /**
   * Visit a parse tree produced by the `revRangeAfter1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevRangeAfter1?: (ctx: RevRangeAfter1Context) => Result;
  /**
   * Visit a parse tree produced by the `revAuthor`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevAuthor?: (ctx: RevAuthorContext) => Result;
  /**
   * Visit a parse tree produced by the `revExclude`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevExclude?: (ctx: RevExcludeContext) => Result;
  /**
   * Visit a parse tree produced by the `revRange1`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevRange1?: (ctx: RevRange1Context) => Result;
  /**
   * Visit a parse tree produced by the `revRangeAfter2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevRangeAfter2?: (ctx: RevRangeAfter2Context) => Result;
  /**
   * Visit a parse tree produced by the `revCommiter`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevCommiter?: (ctx: RevCommiterContext) => Result;
  /**
   * Visit a parse tree produced by the `revGrep`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevGrep?: (ctx: RevGrepContext) => Result;
  /**
   * Visit a parse tree produced by the `revExpression`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevExpression?: (ctx: RevExpressionContext) => Result;
  /**
   * Visit a parse tree produced by the `revMaxAge`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevMaxAge?: (ctx: RevMaxAgeContext) => Result;
  /**
   * Visit a parse tree produced by the `revMulti`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevMulti?: (ctx: RevMultiContext) => Result;
  /**
   * Visit a parse tree produced by the `revMinAge`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevMinAge?: (ctx: RevMinAgeContext) => Result;
  /**
   * Visit a parse tree produced by the `revRange2`
   * labeled alternative in `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevRange2?: (ctx: RevRange2Context) => Result;
  /**
   * Visit a parse tree produced by the `refName`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRefName?: (ctx: RefNameContext) => Result;
  /**
   * Visit a parse tree produced by the `refOID`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRefOID?: (ctx: RefOIDContext) => Result;
  /**
   * Visit a parse tree produced by the `refExclude`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRefExclude?: (ctx: RefExcludeContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.refname`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRefname?: (ctx: RefnameContext) => Result;
  /**
   * Visit a parse tree produced by the `exprPos`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExprPos?: (ctx: ExprPosContext) => Result;
  /**
   * Visit a parse tree produced by the `exprDigit`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExprDigit?: (ctx: ExprDigitContext) => Result;
  /**
   * Visit a parse tree produced by the `exprText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExprText?: (ctx: ExprTextContext) => Result;
  /**
   * Visit a parse tree produced by the `exprRevText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExprRevText?: (ctx: ExprRevTextContext) => Result;
  /**
   * Visit a parse tree produced by the `exprDigitText`
   * labeled alternative in `reversionParser.rev_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitExprDigitText?: (ctx: ExprDigitTextContext) => Result;
  /**
   * Visit a parse tree produced by the `posHead`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPosHead?: (ctx: PosHeadContext) => Result;
  /**
   * Visit a parse tree produced by the `posExclude`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPosExclude?: (ctx: PosExcludeContext) => Result;
  /**
   * Visit a parse tree produced by the `posNeg`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPosNeg?: (ctx: PosNegContext) => Result;
  /**
   * Visit a parse tree produced by the `posReverse`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPosReverse?: (ctx: PosReverseContext) => Result;
  /**
   * Visit a parse tree produced by the `posAnchor`
   * labeled alternative in `reversionParser.rev_position`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPosAnchor?: (ctx: PosAnchorContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.rev_direction`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRev_direction?: (ctx: Rev_directionContext) => Result;
  /**
   * Visit a parse tree produced by the `anchorDate`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnchorDate?: (ctx: AnchorDateContext) => Result;
  /**
   * Visit a parse tree produced by the `anchorSignedDigit`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnchorSignedDigit?: (ctx: AnchorSignedDigitContext) => Result;
  /**
   * Visit a parse tree produced by the `anchorDigit`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnchorDigit?: (ctx: AnchorDigitContext) => Result;
  /**
   * Visit a parse tree produced by the `anchorText`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnchorText?: (ctx: AnchorTextContext) => Result;
  /**
   * Visit a parse tree produced by the `anchorIso`
   * labeled alternative in `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitAnchorIso?: (ctx: AnchorIsoContext) => Result;
  /**
   * Visit a parse tree produced by the `dateYesterday`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDateYesterday?: (ctx: DateYesterdayContext) => Result;
  /**
   * Visit a parse tree produced by the `dateToday`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDateToday?: (ctx: DateTodayContext) => Result;
  /**
   * Visit a parse tree produced by the `dateIso8601`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDateIso8601?: (ctx: DateIso8601Context) => Result;
  /**
   * Visit a parse tree produced by the `dateTimePoint`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDateTimePoint?: (ctx: DateTimePointContext) => Result;
  /**
   * Visit a parse tree produced by the `timePointValue`
   * labeled alternative in `reversionParser.time_point`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTimePointValue?: (ctx: TimePointValueContext) => Result;
  /**
   * Visit a parse tree produced by the `timePointDigit`
   * labeled alternative in `reversionParser.time_point`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTimePointDigit?: (ctx: TimePointDigitContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.time_value`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTime_value?: (ctx: Time_valueContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.time_unit`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTime_unit?: (ctx: Time_unitContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.time_direction`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTime_direction?: (ctx: Time_directionContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.iso_8601`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIso_8601?: (ctx: Iso_8601Context) => Result;
}
