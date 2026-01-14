import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {PlaylistId} from "../../../type/spotify/Playlist.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {useCallback} from "react";

export default function useRemovePlaylist() {
  const [{ socket, roomId, playerId }] = useStateProvider();

  return useCallback((playlistId: PlaylistId) => {
    socket.emit(RoomSocketEvents.REMOVE_PLAYLIST, {
      roomId,
      playerId,
      playlistId,
    })
  }, [socket, roomId, playerId]);
}