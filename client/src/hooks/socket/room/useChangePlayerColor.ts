import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {Socket} from "socket.io-client";
import {RoomId} from "../../../type/room/RoomState.ts";
import {PlayerId} from "../../../type/player/Player.ts";

export default function useChangePlayerColor(socket: Socket, roomId: RoomId, playerId: PlayerId, color: string) {
  socket.emit(RoomSocketEvents.CHANGE_PLAYER_COLOR, {
    roomId,
    playerId,
    newColor: color,
  })
}