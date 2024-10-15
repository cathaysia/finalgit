// Generated from reversion.g4 by ANTLR 4.13.0

import { ParseTreeVisitor } from 'antlr4';

// @ts-ignore

import { ReversionContext } from './reversionParser';
import { RulesContext } from './reversionParser';
import { RevContext } from './reversionParser';
import { RefnameContext } from './reversionParser';
import { Rev_expressionContext } from './reversionParser';
import { Rev_positionContext } from './reversionParser';
import { Rev_directionContext } from './reversionParser';
import { Ref_anchorContext } from './reversionParser';
import { DateContext } from './reversionParser';
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
   * Visit a parse tree produced by `reversionParser.rules`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRules?: (ctx: RulesContext) => Result;
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
   * Visit a parse tree produced by `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRef_anchor?: (ctx: Ref_anchorContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDate?: (ctx: DateContext) => Result;
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
