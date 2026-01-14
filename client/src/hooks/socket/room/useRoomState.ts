import {useEffect} from "react";
import {RoomState} from "../../../type/room/RoomState.ts";
import {ConnectionType, getBaseUrl, reducerCases} from "../../../utils/constants.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {EventResponse} from "../../../type/EventResponse.ts";

export default function useRoomState() {
  const [{ socket }, dispatch] = useStateProvider();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleRoomState = (response: EventResponse<RoomState>) => {
      const roomState = response.data;
      if (response.success && roomState) {
        dispatch({ type: reducerCases.SET_ROOM_ID, roomId: roomState.roomId });
        dispatch({ type: reducerCases.SET_PLAYERS, players: roomState.players });
        dispatch({ type: reducerCases.SET_PLAYLISTS, playlists: roomState.playlists });
        if (roomState.roomId === "") {
          window.location.href = getBaseUrl(ConnectionType.CLIENT);
        }
      }
    };

    socket.on(RoomSocketEvents.ROOM_STATE, handleRoomState);

    return () => {
      socket.off(RoomSocketEvents.ROOM_STATE, handleRoomState);
    }
  }, [socket, dispatch]);
}