import {gameReducerCases} from "./GameReducerCases.ts";
import {GameAction} from "./GameAction.ts";
import {GameState} from "./GameState.ts";

export const gameReducer = (state: GameState, action: GameAction) => {
  switch (action.type) {
    case gameReducerCases.SET_GAME_STATUS: {
      return {
        ...state,
        gameStatus: action.gameStatus,
      };
    }
    case gameReducerCases.SET_ITEMS: {
      return {
        ...state,
        items: action.items,
      };
    }
    case gameReducerCases.SET_IS_DRAGGING: {
      return {
        ...state,
        isDragging: action.isDragging,
      };
    }
    default:
      return state;
  }
};