import {gameReducerCases} from "./GameReducerCases.ts";
import {GameStatus} from "../../type/game/GameState.ts";
import {Token} from "../../type/item/Token.ts";
import {Card, CardId} from "../../type/item/Card.ts";
import {PlayerId} from "../../type/player/Player.ts";
import {ItemStatus} from "../../type/item/ItemStatus.ts";

export interface SetGameStatusGameAction {
  type: gameReducerCases.SET_GAME_STATUS;
  gameStatus: GameStatus;
}

export interface SetItemsGameAction {
  type: gameReducerCases.SET_ITEMS;
  items: (Card | Token)[];
}

export interface SetCurrentCardIdGameAction {
  type: gameReducerCases.SET_CURRENT_CARD_ID;
  currentCardId: CardId;
}

export interface SetCurrentCardStatusGameAction {
  type: gameReducerCases.SET_CURRENT_CARD_STATUS;
  currentCardStatus: ItemStatus;
}

export interface SetCurrentPlayerIdGameAction {
  type: gameReducerCases.SET_CURRENT_PLAYER_ID;
  currentPlayerId: PlayerId;
}

export type GameAction =
  | SetGameStatusGameAction
  | SetItemsGameAction
  | SetCurrentCardIdGameAction
  | SetCurrentCardStatusGameAction
  | SetCurrentPlayerIdGameAction