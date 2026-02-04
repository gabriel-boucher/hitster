import {Dispatch} from "react";
import {GameStatus} from "../../type/game/GameState.ts";
import {GameAction} from "./GameAction.ts";
import {ItemStatus} from "../../type/item/ItemStatus.ts";

export const gameInitialState = {
  gameStatus: GameStatus.LOBBY,
  items: [],
  currentCardId: "",
  currentCardStatus: ItemStatus.MOVING_IN_CURRENT_DECK,
  currentPlayerId: "",
};

export const gameDefaultDispatch: Dispatch<GameAction> = () => {};