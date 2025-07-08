import { Action, State } from "./Interfaces";
import { initialGameState } from "../../../shared/Constants";
import { reducerCases } from "./Constants";
import { Dispatch } from "react";
import { io } from "socket.io-client";

const HOST = import.meta.env.VITE_SERVER_HOST || 'localhost';
const PORT = parseInt(import.meta.env.VITE_SERVER_PORT || "3000");

const socket = io(`http://${HOST}:${PORT}`);

export const initialState = {
  ...initialGameState,
  isDragging: false,
  socket,
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
