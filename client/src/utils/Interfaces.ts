import { Socket } from "socket.io-client";
import { reducerCases } from "./constants";
import { GameInterface } from "@shared/interfaces";
import {Player, PlayerId} from "../type/player/Player.ts";
import {Playlist} from "../type/spotify/Playlist.ts";
import {RoomId} from "../type/room/RoomState.ts";
import {GameStatus} from "../type/game/GameState.ts";
import {Card} from "../type/item/Card.ts";
import {Token} from "../type/item/Token.ts";

export interface State extends GameInterface {
  socket: Socket;
  roomId: RoomId;
  playerId: PlayerId;
  isDragging: boolean;
}

export interface SetSocketAction {
  type: reducerCases.SET_SOCKET;
  socket: Socket;
}

export interface SetRoomIdAction {
  type: reducerCases.SET_ROOM_ID;
  roomId: RoomId;
}

export interface SetPlayerIdAction {
  type: reducerCases.SET_PLAYER_ID;
  playerId: PlayerId;
}

export interface SetGameStatusAction {
  type: reducerCases.SET_GAME_STATUS;
  gameStatus: GameStatus;
}

export interface SetPlayersAction {
  type: reducerCases.SET_PLAYERS;
  players: Player[];
}

export interface SetItemsAction {
  type: reducerCases.SET_ITEMS;
  items: (Card | Token)[];
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
  | SetPlayerIdAction
  | SetGameStatusAction
  | SetPlayersAction
  | SetItemsAction
  | SetPlaylistsAction
  | SetIsDragging;
