import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {PlayerId} from "../../../type/player/Player.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {useCallback} from "react";

export default function useRemovePlayer() {
  const [{socket, roomId, playerId}] = useStateProvider();
  return useCallback((playerToRemoveId: PlayerId) => {
    socket.emit(RoomSocketEvents.REMOVE_PLAYER, {
      roomId,
      playerId,
      playerToRemoveId,
    })
  }, [socket, roomId, playerId]);
}