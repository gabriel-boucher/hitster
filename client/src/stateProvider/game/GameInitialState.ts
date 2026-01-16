import {Dispatch} from "react";
import {GameStatus} from "../../type/game/GameState.ts";
import {GameAction} from "./GameAction.ts";

export const gameInitialState = {
  gameStatus: GameStatus.LOBBY,
  items: [],
  isDragging: false
};

export const gameDefaultDispatch: Dispatch<GameAction> = () => {};