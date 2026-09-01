import {Dispatch} from "react";
import {GameAction} from "./GameAction.ts";
import {ItemStatus} from "../../type/item/ItemStatus.ts";

export const gameInitialState = {
  gameStatus: undefined,
  items: [],
  currentCardId: "",
  currentCardStatus: ItemStatus.MOVING_IN_CURRENT_DECK,
  currentPlayerId: "",
};

export const gameDefaultDispatch: Dispatch<GameAction> = () => {};