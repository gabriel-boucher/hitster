import { Socket } from "socket.io-client";
import { reducerCases } from "./constants";
import { GameInterface, CardInterface, TokenInterface } from "@shared/interfaces";
import { gameStates } from "@shared/constants";
import {Player} from "../type/player/Player.ts";
import {Playlist} from "../type/spotify/Playlist.ts";

export interface State extends GameInterface {
  socket: Socket;
  roomId: string;
  isDragging: boolean;
}

export interface SetSocketAction {
  type: reducerCases.SET_SOCKET;
  socket: Socket;
}

export interface SetRoomIdAction {
  type: reducerCases.SET_ROOM_ID;
  roomId: string;
}

export interface SetGameStateAction {
  type: reducerCases.SET_GAME_STATE;
  gameState: gameStates;
}

export interface SetPlayersAction {
  type: reducerCases.SET_PLAYERS;
  players: Player[];
}

export interface SetItemsAction {
  type: reducerCases.SET_ITEMS;
  items: (CardInterface | TokenInterface)[];
}

export interface SetPlaylistsAction {
  type: reducerCases.SET_PLAYLISTS;
  playlists: Playlist[];
}

export interface SetIsDragging {
  type: reducerCases.SET_IS_DRAGGING;
  isDragging: boolean;
}

export type Action =
  | SetSocketAction
  | SetRoomIdAction
  | SetGameStateAction
  | SetPlayersAction
  | SetItemsAction
  | SetPlaylistsAction
  | SetIsDragging;
