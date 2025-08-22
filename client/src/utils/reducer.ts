import { Action, State } from "./interfaces";
import { initialGameState } from "../../../shared/constants";
import { ConnectionType, getBaseUrl, reducerCases } from "./constants";
import { Dispatch } from "react";
import { io } from "socket.io-client";

const socket = io(getBaseUrl(ConnectionType.SERVER));

export const initialState = {
  ...initialGameState,
  socket,
  roomId: "",
  isDragging: false,
};

export const defaultDispatch: Dispatch<Action> = () => {};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerCases.SET_SOCKET: {
      return {
        ...state,
        socket: action.socket,
      };
    }
    case reducerCases.SET_ROOM_ID: {
      return {
        ...state,
        roomId: action.roomId,
      };
    }
    case reducerCases.SET_GAME_STATE: {
      return {
        ...state,
        gameState: action.gameState,
      };
    }
    case reducerCases.SET_PLAYERS: {
      return {
        ...state,
        players: action.players,
      };
    }
    case reducerCases.SET_ITEMS: {
      return {
        ...state,
        items: action.items,
      };
    }
    case reducerCases.SET_IS_DRAGGING: {
      return {
        ...state,
        isDragging: action.isDragging,
      };
    }
    default:
      return state;
  }
};
