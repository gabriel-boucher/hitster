import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {useCallback} from "react";

export default function useChangePlayerColor() {
  const [{socket, roomId, playerId}] = useStateProvider();

  return useCallback((color: string) => {
    socket.emit(RoomSocketEvents.CHANGE_PLAYER_COLOR, {
      roomId,
      playerId,
      newColor: color,
    })
  }, [socket, roomId, playerId]);
}