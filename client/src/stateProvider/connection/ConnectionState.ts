import { Socket } from "socket.io-client";
import {RoomId} from "../../type/room/RoomState.ts";
import {PlayerId} from "../../type/player/Player.ts";

export interface ConnectionState {
  socket: Socket;
  roomId: RoomId;
  playerId: PlayerId;
}