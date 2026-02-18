import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { RoomHttpEvents } from "./roomHttpEvents.ts";

export default function useChangePlayerName() {
  const [{socket, roomId, playerId}] = useConnectionStateProvider();

  return useCallback(async (userName: string) => {
    if (!socket) return;

    await changePlayerName(roomId, playerId, userName);
  }, [socket, roomId, playerId]);
}

async function changePlayerName(roomId: RoomId, playerId: PlayerId, newName: string): Promise<void> {
  await axios.put(
      `${HTTP_SERVER_URL}/api/room/${RoomHttpEvents.CHANGE_PLAYER_NAME}`,
      {
        roomId,
        playerId,
        newName
      }
  );
}