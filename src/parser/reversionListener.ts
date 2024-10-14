// @ts-nocheck
// Generated from reversion.g4 by ANTLR 4.13.0

import { ParseTreeListener } from 'antlr4';

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
   * Enter a parse tree produced by `reversionParser.starts`.
   * @param ctx the parse tree
   */
  enterStarts?: (ctx: StartsContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.starts`.
   * @param ctx the parse tree
   */
  exitStarts?: (ctx: StartsContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.sep`.
   * @param ctx the parse tree
   */
  enterSep?: (ctx: SepContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.sep`.
   * @param ctx the parse tree
   */
  exitSep?: (ctx: SepContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.offset`.
   * @param ctx the parse tree
   */
  enterOffset?: (ctx: OffsetContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.offset`.
   * @param ctx the parse tree
   */
  exitOffset?: (ctx: OffsetContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.date`.
   * @param ctx the parse tree
   */
  enterDate?: (ctx: DateContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.date`.
   * @param ctx the parse tree
   */
  exitDate?: (ctx: DateContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.iso`.
   * @param ctx the parse tree
   */
  enterIso?: (ctx: IsoContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.iso`.
   * @param ctx the parse tree
   */
  exitIso?: (ctx: IsoContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.relative_date`.
   * @param ctx the parse tree
   */
  enterRelative_date?: (ctx: Relative_dateContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.relative_date`.
   * @param ctx the parse tree
   */
  exitRelative_date?: (ctx: Relative_dateContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.precise_date`.
   * @param ctx the parse tree
   */
  enterPrecise_date?: (ctx: Precise_dateContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.precise_date`.
   * @param ctx the parse tree
   */
  exitPrecise_date?: (ctx: Precise_dateContext) => void;
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
   * Enter a parse tree produced by `reversionParser.time_direction`.
   * @param ctx the parse tree
   */
  enterTime_direction?: (ctx: Time_directionContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.time_direction`.
   * @param ctx the parse tree
   */
  exitTime_direction?: (ctx: Time_directionContext) => void;
}
