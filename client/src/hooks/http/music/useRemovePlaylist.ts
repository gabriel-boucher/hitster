import { PlaylistId } from "../../../type/music/Playlist.ts";
import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useRemovePlaylist() {
  const [{ socket, roomId }] = useConnectionStateProvider();

  return useCallback(async (playlistId: PlaylistId) => {
    if (!socket) return;

    await removePlaylist(roomId, playlistId);
  }, [socket, roomId]);
}

async function removePlaylist(gameId: RoomId, playlistId: PlaylistId): Promise<void> {
  await api.delete(apiPaths.removePlaylist(gameId, playlistId));
}
