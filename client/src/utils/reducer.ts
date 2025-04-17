import { Action, State } from "./Interfaces";
import { initialGameState } from "../../../shared/Constants";
import { reducerCases } from "./Constants";
import { Dispatch } from "react";
import { io } from "socket.io-client";

const socket = io("http://192.168.2.209:3000");

export const initialState = {
  ...initialGameState,
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
    case reducerCases.SET_ACTIVE_PLAYER: {
      return {
        ...state,
        activePlayer: action.activePlayer,
      };
    }
    case reducerCases.SET_ITEMS: {
      return {
        ...state,
        items: action.items,
      };
    }
    case reducerCases.SET_ACTIVE_CARD: {
      return {
        ...state,
        activeCard: action.activeCard,
      };
    }
    default:
      return state;
  }
};
