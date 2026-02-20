import { RoomHttpEvents } from "./roomHttpEvents.ts";
import { useCallback } from "react";
import { EventResponse } from "../../../type/EventResponse.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {PlayerId} from "../../../type/player/Player.ts";

export default function useStartGame() {
  const [{ roomId, playerId }] = useConnectionStateProvider();

  return useCallback(async (setPageLoading: (loading: boolean) => void) => {
    setPageLoading(true);
    const response = await startGame(roomId, playerId);
    setPageLoading(false);
    if (response.success) return;
    alert(response.message);
  }, [roomId, playerId]);
}

async function startGame(roomId: RoomId, playerId: PlayerId): Promise<EventResponse<undefined>> {
  const response = await axios.post(
      `${HTTP_SERVER_URL}/api/room/${RoomHttpEvents.START_GAME}`,
      {
        roomId,
        playerId
      }
  );
  return response.data;
}