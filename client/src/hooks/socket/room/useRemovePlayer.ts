import {Socket} from "socket.io-client";
import {RoomId} from "../../../type/room/RoomState.ts";
import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {PlayerId} from "../../../type/player/Player.ts";

export default function useRemovePlayer(socket: Socket, roomId: RoomId, playerId: PlayerId, playerToRemoveId: PlayerId) {
  socket.emit(RoomSocketEvents.REMOVE_PLAYER, {
    roomId,
    playerId,
    playerToRemoveId,
  })
}