import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useChangePlayerName() {
  const [{ socket, roomId }] = useConnectionStateProvider();

  return useCallback(async (userName: string) => {
    if (!socket) return;

    await changePlayerName(roomId, userName);
  }, [socket, roomId]);
}

async function changePlayerName(gameId: RoomId, newName: string): Promise<void> {
  await api.patch(apiPaths.changePlayerName(gameId), { newName });
}
