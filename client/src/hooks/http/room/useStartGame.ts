import { useCallback } from "react";
import { EventResponse } from "../../../type/EventResponse.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useStartGame() {
  const [{ roomId }] = useConnectionStateProvider();

  return useCallback(async (setPageLoading: (loading: boolean) => void) => {
    setPageLoading(true);
    const response = await startGame(roomId);
    setPageLoading(false);
    if (response.success) return;
    alert(response.message);
  }, [roomId]);
}

async function startGame(gameId: RoomId): Promise<EventResponse<string>> {
  const response = await api.post(apiPaths.startGame(gameId));
  return response.data;
}
