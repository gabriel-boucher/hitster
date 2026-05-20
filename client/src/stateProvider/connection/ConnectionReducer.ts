import {connectionReducerCases} from "./ConnectionReducerCases.ts";
import {ConnectionAction} from "./ConnectionAction.ts";
import {ConnectionState} from "./ConnectionState.ts";
import {connectionInitialState} from "./ConnectionInitialState.ts";

export const connectionReducer = (state: ConnectionState, action: ConnectionAction) => {
  switch (action.type) {
    case connectionReducerCases.SET_SOCKET: {
      return {
        ...state,
        socket: action.socket,
      };
    }
    case connectionReducerCases.SET_ROOM_ID: {
      return {
        ...state,
        roomId: action.roomId,
      };
    }
    case connectionReducerCases.SET_PLAYER_ID: {
      return {
        ...state,
        playerId: action.playerId,
      };
    }
    case connectionReducerCases.RESET: {
      return connectionInitialState;
    }
    default:
      return state;
  }
};