import {gameReducerCases} from "./GameReducerCases.ts";
import {GameStatus} from "../../type/game/GameState.ts";
import {Token} from "../../type/item/Token.ts";
import {Card} from "../../type/item/Card.ts";

export interface SetGameStatusGameAction {
  type: gameReducerCases.SET_GAME_STATUS;
  gameStatus: GameStatus;
}

export interface SetItemsGameAction {
  type: gameReducerCases.SET_ITEMS;
  items: (Card | Token)[];
}

export interface SetIsDraggingGameAction {
  type: gameReducerCases.SET_IS_DRAGGING;
  isDragging: boolean;
}

export type GameAction =
  | SetGameStatusGameAction
  | SetItemsGameAction
  | SetIsDraggingGameAction