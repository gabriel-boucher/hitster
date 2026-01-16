import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {PlaylistId} from "../../../type/spotify/Playlist.ts";
import {useCallback} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useRemovePlaylist() {
  const [{ socket, roomId, playerId }] = useConnectionStateProvider();

  return useCallback((playlistId: PlaylistId) => {
    socket.emit(RoomSocketEvents.REMOVE_PLAYLIST, {
      roomId,
      playerId,
      playlistId,
    })
  }, [socket, roomId, playerId]);
}