import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {Playlist} from "../../../type/spotify/Playlist.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {useCallback} from "react";

export default function useAddPlaylist() {
  const [{ socket, roomId, playerId }] = useStateProvider();

  return useCallback((playlist: Playlist) => {
    socket.emit(RoomSocketEvents.ADD_PLAYLIST, {
      roomId,
      playerId,
      playlist,
    })
  }, [socket, roomId, playerId]);
}