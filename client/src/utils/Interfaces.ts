import { Socket } from "socket.io-client";
import { reducerCases } from "./Constants";

export interface PlayerInterface {
  socketId: string;
  name: string;
}

export interface CardInterface {
  id: string;
  song: string;
  artist: string;
  date: string;
  albumCover: string;
  playerId: string | null;
}

export interface TokenInterface {
  id: string;
  active: boolean;
  activePlayerId: string | null;
  playerId: string;
}

export interface State {
  spotifyToken: string;
  socket: Socket;
  players: PlayerInterface[];
  activePlayer: PlayerInterface | null;
  items: (CardInterface | TokenInterface)[];
  activeCard: CardInterface | null;
}
export interface SetSpotifyTokenAction {
  type: reducerCases.SET_SPOTIFY_TOKEN;
  spotifyToken: string;
}

export interface SetSocketAction {
  type: reducerCases.SET_SOCKET;
  socket: Socket;
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
  | SetSpotifyTokenAction
  | SetSocketAction
  | SetPlayersAction
  | SetActivePlayer
  | SetItemsAction
  | SetActiveCardAction
