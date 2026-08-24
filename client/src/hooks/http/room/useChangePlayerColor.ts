import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useChangePlayerColor() {
  const [{ socket, roomId }] = useConnectionStateProvider();

  return useCallback(async (color: string) => {
    if (!socket) return;

    await changePlayerColor(roomId, color);
  }, [socket, roomId]);
}

async function changePlayerColor(gameId: RoomId, newColor: string): Promise<void> {
  await api.patch(apiPaths.changePlayerColor(gameId), { newColor });
}
