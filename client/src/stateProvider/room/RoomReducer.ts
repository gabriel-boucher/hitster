import {roomReducerCases} from "./RoomReducerCases.ts";
import {RoomAction} from "./RoomAction.ts";
import {RoomState} from "./RoomState.ts";

export const roomReducer = (state: RoomState, action: RoomAction) => {
  switch (action.type) {
    case roomReducerCases.SET_PLAYERS: {
      return {
        ...state,
        players: action.players,
      };
    }
    case roomReducerCases.SET_PLAYLISTS: {
      return {
        ...state,
        playlists: action.playlists,
      };
    }
    case roomReducerCases.SET_MUSIC_PLAYER_TYPE: {
      return {
        ...state,
        musicPlayerType: action.musicPlayerType,
      };
    }
    default:
      return state;
  }
};