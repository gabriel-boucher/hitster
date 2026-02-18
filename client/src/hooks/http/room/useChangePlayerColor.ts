import { RoomHttpEvents } from "./roomHttpEvents.ts";
import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";

export default function useChangePlayerColor() {
  const [{socket, roomId, playerId}] = useConnectionStateProvider();

  return useCallback(async (color: string) => {
    if (!socket) return;

    await changePlayerColor(roomId, playerId, color);
  }, [socket, roomId, playerId]);
}

async function changePlayerColor(roomId: RoomId, playerId: PlayerId, newColor: string): Promise<void> {
  await axios.put(
      `${HTTP_SERVER_URL}/api/room/${RoomHttpEvents.CHANGE_PLAYER_COLOR}`,
      {
        roomId,
        playerId,
        newColor
      }
  );
}