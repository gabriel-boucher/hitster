import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {useCallback} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useChangePlayerName() {
  const [{socket, roomId, playerId}] = useConnectionStateProvider();
  return useCallback((userName: string) => {
    socket.emit(RoomSocketEvents.CHANGE_PLAYER_NAME, {
      roomId,
      playerId,
      newName: userName,
    })
  }, [socket, roomId, playerId]);
}