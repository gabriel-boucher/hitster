import { Playlist } from "../../../type/music/Playlist.ts";
import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import { MusicHttpEvents } from "./musicHttpEvents.ts";

export default function useAddPlaylist() {
  const [{ socket, roomId, playerId }] = useConnectionStateProvider();

  return useCallback(async (playlist: Playlist) => {
    if (!socket) return;

    await addPlaylist(roomId, playerId, playlist);
  }, [socket, roomId, playerId]);
}

async function addPlaylist(roomId: RoomId, playerId: PlayerId, playlist: Playlist): Promise<void> {
  await axios.post(
      `${HTTP_SERVER_URL}/api/music/${MusicHttpEvents.ADD_PLAYLIST}`,
      {
        roomId,
        playerId,
        playlist,
      }
  );
}