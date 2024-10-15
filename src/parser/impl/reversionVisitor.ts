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
import { RevContext } from './reversionParser';
import { RefnameContext } from './reversionParser';
import { Rev_expressionContext } from './reversionParser';
import { Rev_positionContext } from './reversionParser';
import { Rev_directionContext } from './reversionParser';
import { AnchorDateContext } from './reversionParser';
import { AnchorSignedDigitContext } from './reversionParser';
import { AnchorDigitContext } from './reversionParser';
import { AnchorTextContext } from './reversionParser';
import { AnchorIsoContext } from './reversionParser';
import { YesterdayContext } from './reversionParser';
import { TodayContext } from './reversionParser';
import { TimepointContext } from './reversionParser';
import { Time_pointContext } from './reversionParser';
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
   * Visit a parse tree produced by `reversionParser.rev`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRev?: (ctx: RevContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.refname`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRefname?: (ctx: RefnameContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.rev_expression`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRev_expression?: (ctx: Rev_expressionContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.rev_position`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRev_position?: (ctx: Rev_positionContext) => Result;
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
   * Visit a parse tree produced by the `yesterday`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitYesterday?: (ctx: YesterdayContext) => Result;
  /**
   * Visit a parse tree produced by the `today`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitToday?: (ctx: TodayContext) => Result;
  /**
   * Visit a parse tree produced by the `timepoint`
   * labeled alternative in `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTimepoint?: (ctx: TimepointContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.time_point`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitTime_point?: (ctx: Time_pointContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.iso_8601`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIso_8601?: (ctx: Iso_8601Context) => Result;
}
