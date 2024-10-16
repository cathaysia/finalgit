// Generated from reversion.g4 by ANTLR 4.13.0

import { ParseTreeVisitor } from 'antlr4';

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
import { RevExcludeContext } from './reversionParser';
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
   * Visit a parse tree produced by the `revExclude`
   * labeled alternative in `reversionParser.rev`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRevExclude?: (ctx: RevExcludeContext) => Result;
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
   * Visit a parse tree produced by `reversionParser.iso_8601`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIso_8601?: (ctx: Iso_8601Context) => Result;
}
