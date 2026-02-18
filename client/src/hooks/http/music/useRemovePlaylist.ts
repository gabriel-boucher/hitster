import { PlaylistId } from "../../../type/music/Playlist.ts";
import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { MusicHttpEvents } from "./musicHttpEvents.ts";

export default function useRemovePlaylist() {
  const [{ socket, roomId, playerId }] = useConnectionStateProvider();

  return useCallback(async (playlistId: PlaylistId) => {
    if (!socket) return;

    await removePlaylist(roomId, playerId, playlistId);
  }, [socket, roomId, playerId]);
}

async function removePlaylist(roomId: RoomId, playerId: PlayerId, playlistId: PlaylistId): Promise<void> {
  await axios.delete(
      `${HTTP_SERVER_URL}/api/music/${MusicHttpEvents.REMOVE_PLAYLIST}/${playlistId}`,
      {
        headers: {
          "x-room-id": roomId,
          "x-player-id": playerId,
        },
      }
  );
}