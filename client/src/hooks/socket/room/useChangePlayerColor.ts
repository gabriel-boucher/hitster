import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {Socket} from "socket.io-client";
import {RoomId} from "../../../type/room/RoomState.ts";

export default function useChangePlayerColor(socket: Socket, roomId: RoomId, color: string) {
  socket.emit(RoomSocketEvents.CHANGE_PLAYER_COLOR, {
    roomId,
    playerId: socket.id,
    newColor: color,
  })
}