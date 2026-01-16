import {connectionReducerCases} from "./ConnectionReducerCases.ts";
import {ConnectionAction} from "./ConnectionAction.ts";
import {ConnectionState} from "./ConnectionState.ts";

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
    default:
      return state;
  }
};