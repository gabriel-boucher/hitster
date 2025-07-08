import { Socket } from "socket.io-client";
import { reducerCases } from "./Constants";
import { GameInterface, CardInterface, PlayerInterface, TokenInterface } from "@shared/Interfaces";
import { gameStates } from "@shared/Constants";

export interface State extends GameInterface {
  socket: Socket;
  isDragging: boolean;
}

export interface SetSocketAction {
  type: reducerCases.SET_SOCKET;
  socket: Socket;
}

export interface SetGameStateAction {
  type: reducerCases.SET_GAME_STATE;
  gameState: gameStates;
}

export interface SetPlayersAction {
  type: reducerCases.SET_PLAYERS;
  players: PlayerInterface[];
}

export interface SetItemsAction {
  type: reducerCases.SET_ITEMS;
  items: (CardInterface | TokenInterface)[];
}

export interface SetIsDragging {
  type: reducerCases.SET_IS_DRAGGING;
  isDragging: boolean;
}

export type Action =
  | SetSocketAction
  | SetGameStateAction
  | SetPlayersAction
  | SetItemsAction
  | SetIsDragging;
