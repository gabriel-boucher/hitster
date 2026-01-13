import {useEffect} from "react";
import {PlayerId} from "../../../type/player/Player.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {reducerCases} from "../../../utils/constants.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {ConnectionSocketEvents} from "../connection/connectionSocketEvents.ts";

export default function useJoinRoom(playerIdRef: React.RefObject<PlayerId>) {
  const [{ socket }, dispatch] = useStateProvider();

  useEffect(() => {
    const roomId: RoomId = window.location.pathname.substring(1) || "";
    dispatch({ type: reducerCases.SET_ROOM_ID, roomId: roomId });

    const handleConnect = () => {
      if (roomId && socket.id) {
        const playerId: PlayerId = socket.id;
        playerIdRef.current = playerId;
        dispatch({ type: reducerCases.SET_PLAYER_ID, playerId });
        socket.emit(RoomSocketEvents.JOIN_ROOM, { roomId, playerId });
      }
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on(ConnectionSocketEvents.CONNECT, handleConnect);
    }

    return () => {
      if (socket) {
        socket.off(ConnectionSocketEvents.CONNECT, handleConnect);
      }
    };
  }, [socket, dispatch]);
}