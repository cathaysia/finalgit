// @ts-nocheck
// Generated from reversion.g4 by ANTLR 4.13.0

import { ParseTreeVisitor } from 'antlr4';

import { ReversionContext } from './reversionParser';
import { StartsContext } from './reversionParser';
import { SepContext } from './reversionParser';
import { OffsetContext } from './reversionParser';
import { DateContext } from './reversionParser';
import { IsoContext } from './reversionParser';
import { Relative_dateContext } from './reversionParser';
import { Precise_dateContext } from './reversionParser';
import { Time_unitContext } from './reversionParser';
import { Time_directionContext } from './reversionParser';

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
   * Visit a parse tree produced by `reversionParser.starts`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitStarts?: (ctx: StartsContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.sep`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitSep?: (ctx: SepContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.offset`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitOffset?: (ctx: OffsetContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitDate?: (ctx: DateContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.iso`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitIso?: (ctx: IsoContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.relative_date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitRelative_date?: (ctx: Relative_dateContext) => Result;
  /**
   * Visit a parse tree produced by `reversionParser.precise_date`.
   * @param ctx the parse tree
   * @return the visitor result
   */
  visitPrecise_date?: (ctx: Precise_dateContext) => Result;
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
}
