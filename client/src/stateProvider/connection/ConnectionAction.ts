import {Socket} from "socket.io-client";
import {RoomId} from "../../type/room/RoomState.ts";
import {PlayerId} from "../../type/player/Player.ts";
import {connectionReducerCases} from "./ConnectionReducerCases.ts";

export interface SetSocketConnectionAction {
  type: connectionReducerCases.SET_SOCKET;
  socket: Socket;
}

export interface SetRoomIdConnectionAction {
  type: connectionReducerCases.SET_ROOM_ID;
  roomId: RoomId;
}

export interface SetPlayerIdConnectionAction {
  type: connectionReducerCases.SET_PLAYER_ID;
  playerId: PlayerId;
}

export type ConnectionAction =
  | SetSocketConnectionAction
  | SetRoomIdConnectionAction
  | SetPlayerIdConnectionAction
