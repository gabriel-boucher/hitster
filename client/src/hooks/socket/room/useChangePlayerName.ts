import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {Socket} from "socket.io-client";
import {RoomId} from "../../../type/room/RoomState.ts";
import {PlayerId} from "../../../type/player/Player.ts";

export default function useChangePlayerName(socket: Socket, roomId: RoomId, playerId: PlayerId, userName: string) {
  socket.emit(RoomSocketEvents.CHANGE_PLAYER_NAME, {
    roomId,
    playerId,
    newName: userName,
  })
}