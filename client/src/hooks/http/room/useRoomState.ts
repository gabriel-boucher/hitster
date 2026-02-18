import {useEffect} from "react";
import {RoomState} from "../../../type/room/RoomState.ts";
import {EventResponse} from "../../../type/EventResponse.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {roomReducerCases} from "../../../stateProvider/room/RoomReducerCases.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {CLIENT_URL} from "../../../config/url.ts";
import {StateChangedSocketEvents} from "../../socket/stateChangedSocketEvents.ts";

export default function useRoomState() {
  const [{ socket }, connectionDispatch] = useConnectionStateProvider();
  const [, roomDispatch] = useRoomStateProvider();

  useEffect(() => {
    if (!socket) return;

    const handleRoomState = (response: EventResponse<RoomState>) => {
      const roomState = response.data;
      if (response.success && roomState) {
        connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: roomState.roomId });
        roomDispatch({ type: roomReducerCases.SET_PLAYERS, players: roomState.players });
        roomDispatch({ type: roomReducerCases.SET_PLAYLISTS, playlists: roomState.playlists });
        roomDispatch({ type: roomReducerCases.SET_MUSIC_PLAYER_TYPE, musicPlayerType: roomState.musicPlayerType });
        if (roomState.roomId === "") {
          window.location.href = CLIENT_URL;
        }
      }
    };

    socket.on(StateChangedSocketEvents.ROOM_STATE_CHANGED, handleRoomState);

    return () => {
      socket.off(StateChangedSocketEvents.ROOM_STATE_CHANGED, handleRoomState);
    }
  }, [socket, connectionDispatch, roomDispatch]);
}