import { Socket } from "socket.io-client";
import { reducerCases } from "./Constants";
import { GameInterface, gameStates, CardInterface, PlayerInterface, TokenInterface } from "../../../Interfaces";

export interface State extends GameInterface {
  socket: Socket;
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

export interface SetActivePlayer {
  type: reducerCases.SET_ACTIVE_PLAYER;
  activePlayer: PlayerInterface;
}

export interface SetItemsAction {
  type: reducerCases.SET_ITEMS;
  items: (CardInterface | TokenInterface)[];
}

export interface SetActiveCardAction {
  type: reducerCases.SET_ACTIVE_CARD;
  activeCard: CardInterface;
}

export type Action =
  | SetSocketAction
  | SetGameStateAction
  | SetPlayersAction
  | SetActivePlayer
  | SetItemsAction
  | SetActiveCardAction
