import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {Socket} from "socket.io-client";
import {RoomId} from "../../../type/room/RoomState.ts";

export default function useChangePlayerName(socket: Socket, roomId: RoomId, userName: string) {
  socket.emit(RoomSocketEvents.CHANGE_PLAYER_NAME, {
    roomId,
    playerId: socket.id,
    newName: userName,
  })
}