import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {useCallback} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useChangePlayerColor() {
  const [{socket, roomId, playerId}] = useConnectionStateProvider();

  return useCallback((color: string) => {
    socket.emit(RoomSocketEvents.CHANGE_PLAYER_COLOR, {
      roomId,
      playerId,
      newColor: color,
    })
  }, [socket, roomId, playerId]);
}