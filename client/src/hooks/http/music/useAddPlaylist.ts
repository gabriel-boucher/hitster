import { Playlist } from "../../../type/music/Playlist.ts";
import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useAddPlaylist() {
  const [{ socket, roomId }] = useConnectionStateProvider();

  return useCallback(async (playlist: Playlist) => {
    if (!socket) return;

    await addPlaylist(roomId, playlist);
  }, [socket, roomId]);
}

async function addPlaylist(gameId: RoomId, playlist: Playlist): Promise<void> {
  await api.post(apiPaths.addPlaylist(gameId), { playlist });
}
