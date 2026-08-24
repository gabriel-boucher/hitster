import { PlayerId } from "../../../type/player/Player.ts";
import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useRemovePlayer() {
  const [{ socket, roomId }] = useConnectionStateProvider();

  return useCallback(async (playerToRemoveId: PlayerId) => {
    if (!socket) return;

    await removePlayer(roomId, playerToRemoveId);
  }, [socket, roomId]);
}

async function removePlayer(gameId: RoomId, playerToRemoveId: PlayerId): Promise<void> {
  await api.delete(apiPaths.removePlayer(gameId, playerToRemoveId));
}
