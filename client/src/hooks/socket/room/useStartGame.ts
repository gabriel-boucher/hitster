import {Socket} from "socket.io-client";
import {RoomId} from "../../../type/room/RoomState.ts";
import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {PlayerId} from "../../../type/player/Player.ts";

export default function useStartGame(socket: Socket, roomId: RoomId, playerId: PlayerId, setLoading: (loading: boolean) => void) {
  setLoading(true);
  socket.emit(RoomSocketEvents.START_GAME, {
    roomId,
    playerId,
  }, () => {
    setLoading(false);
  })
}