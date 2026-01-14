import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {useCallback} from "react";
import {useStateProvider} from "../../../utils/StateProvider.tsx";

export default function useChangePlayerName() {
  const [{socket, roomId, playerId}] = useStateProvider();
  return useCallback((userName: string) => {
    socket.emit(RoomSocketEvents.CHANGE_PLAYER_NAME, {
      roomId,
      playerId,
      newName: userName,
    })
  }, [socket, roomId, playerId]);
}