import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {Playlist} from "../../../type/spotify/Playlist.ts";
import {useCallback} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useAddPlaylist() {
  const [{ socket, roomId, playerId }] = useConnectionStateProvider();

  return useCallback((playlist: Playlist) => {
    socket.emit(RoomSocketEvents.ADD_PLAYLIST, {
      roomId,
      playerId,
      playlist,
    })
  }, [socket, roomId, playerId]);
}