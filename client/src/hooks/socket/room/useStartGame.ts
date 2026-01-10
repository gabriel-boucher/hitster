import {Socket} from "socket.io-client";
import {RoomId} from "../../../type/room/RoomState.ts";
import {RoomSocketEvents} from "./roomSocketEvents.ts";

export default function useStartGame(socket: Socket, roomId: RoomId) {
  socket.emit(RoomSocketEvents.START_GAME, {
    roomId,
    playerId: socket.id,
  })
}