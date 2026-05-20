import { RoomHttpEvents } from "./roomHttpEvents.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";

export default function useRemovePlayer() {
  const [{socket, roomId, playerId}] = useConnectionStateProvider();

  return useCallback(async (playerToRemoveId: PlayerId) => {
    if (!socket) return;

    await removePlayer(roomId, playerId, playerToRemoveId);
  }, [socket, roomId, playerId]);
}

async function removePlayer(gameId: RoomId, playerId: PlayerId, playerToRemoveId: PlayerId): Promise<void> {
  await axios.delete(
      `${HTTP_SERVER_URL}/api/room/${RoomHttpEvents.REMOVE_PLAYER}/${playerToRemoveId}`,
      {
        headers: {
          "x-game-id": gameId,
          "x-player-id": playerId,
        },
      }
  );
}