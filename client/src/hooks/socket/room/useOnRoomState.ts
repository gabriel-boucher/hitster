import {useEffect} from "react";
import {RoomState} from "../../../type/room/RoomState.ts";
import {reducerCases} from "../../../utils/constants.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {RoomSocketEvents} from "./roomSocketEvents.ts";

export default function useOnRoomState() {
  const [{ socket }, dispatch] = useStateProvider();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleRoomState = (roomState: RoomState) => {
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