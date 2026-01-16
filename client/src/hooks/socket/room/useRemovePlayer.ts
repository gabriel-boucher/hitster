import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {PlayerId} from "../../../type/player/Player.ts";
import {useCallback} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useRemovePlayer() {
  const [{socket, roomId, playerId}] = useConnectionStateProvider();
  return useCallback((playerToRemoveId: PlayerId) => {
    socket.emit(RoomSocketEvents.REMOVE_PLAYER, {
      roomId,
      playerId,
      playerToRemoveId,
    })
  }, [socket, roomId, playerId]);
}