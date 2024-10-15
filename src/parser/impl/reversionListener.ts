// Generated from reversion.g4 by ANTLR 4.13.0

import { ParseTreeListener } from 'antlr4';

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
   * Enter a parse tree produced by `reversionParser.rules`.
   * @param ctx the parse tree
   */
  enterRules?: (ctx: RulesContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.rules`.
   * @param ctx the parse tree
   */
  exitRules?: (ctx: RulesContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.rev`.
   * @param ctx the parse tree
   */
  enterRev?: (ctx: RevContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.rev`.
   * @param ctx the parse tree
   */
  exitRev?: (ctx: RevContext) => void;
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
   * Enter a parse tree produced by `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  enterRev_expression?: (ctx: Rev_expressionContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.rev_expression`.
   * @param ctx the parse tree
   */
  exitRev_expression?: (ctx: Rev_expressionContext) => void;
  /**
   * Enter a parse tree produced by `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  enterRev_position?: (ctx: Rev_positionContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.rev_position`.
   * @param ctx the parse tree
   */
  exitRev_position?: (ctx: Rev_positionContext) => void;
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
   * Enter a parse tree produced by `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  enterRef_anchor?: (ctx: Ref_anchorContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.ref_anchor`.
   * @param ctx the parse tree
   */
  exitRef_anchor?: (ctx: Ref_anchorContext) => void;
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
   * Enter a parse tree produced by `reversionParser.time_point`.
   * @param ctx the parse tree
   */
  enterTime_point?: (ctx: Time_pointContext) => void;
  /**
   * Exit a parse tree produced by `reversionParser.time_point`.
   * @param ctx the parse tree
   */
  exitTime_point?: (ctx: Time_pointContext) => void;
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
