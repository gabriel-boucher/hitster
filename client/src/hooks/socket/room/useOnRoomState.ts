import {useEffect} from "react";
import {RoomState} from "../../../type/room/RoomState.ts";
import {ConnectionType, getBaseUrl, reducerCases} from "../../../utils/constants.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {PlayerId} from "../../../type/player/Player.ts";

export default function useOnRoomState(playerIdRef: React.RefObject<PlayerId>) {
  const [{ socket }, dispatch] = useStateProvider();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleRoomState = (roomState: RoomState) => {
      if (roomState.players.filter(player => player.id === playerIdRef.current).length === 0) {
        window.location.href = getBaseUrl(ConnectionType.CLIENT);
      }
      dispatch({ type: reducerCases.SET_ROOM_ID, roomId: roomState.roomId });
      dispatch({ type: reducerCases.SET_PLAYERS, players: roomState.players });
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists: roomState.playlists });
    };

    socket.on(RoomSocketEvents.ROOM_STATE, handleRoomState);

    return () => {
      socket.off(RoomSocketEvents.ROOM_STATE, handleRoomState);
    }
  }, [socket, dispatch]);
}