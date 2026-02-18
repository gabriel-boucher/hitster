import {useEffect} from "react";
import {PlayerId} from "../../../type/player/Player.ts";
import {EventResponse} from "../../../type/EventResponse.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {CLIENT_URL, WS_SERVER_URL} from "../../../config/url.ts";
import {ConnectionSocketEvents} from "./connectionSocketEvents.ts";
import {io, Socket} from "socket.io-client";
import {RoomId} from "../../../type/room/RoomState.ts";

export default function useJoinRoom() {
  const [{ socket, roomId }, connectionDispatch] = useConnectionStateProvider();

  useEffect(() => {
    const newRoomId = window.location.pathname.substring(1) || "";
    if (socket || !newRoomId) return;

    const newSocket = io(WS_SERVER_URL);

    const handleConnect = async () => {
      connectionDispatch({type: connectionReducerCases.SET_SOCKET, socket: newSocket});
    };

    if (newSocket.connected) {
      handleConnect();
    } else {
      newSocket.on(ConnectionSocketEvents.CONNECT, handleConnect);
    }

    return () => {
      newSocket.off(ConnectionSocketEvents.CONNECT, handleConnect);
    };
  }, [socket, roomId, connectionDispatch]);

  useEffect(() => {
    if (!socket) return;

    const newRoomId = window.location.pathname.substring(1) || "";
    const newPlayerId = socket.id as PlayerId;
    if (!newRoomId || !newPlayerId) return;

    const join = async () => {
      const response = await joinRoom(socket, newRoomId, newPlayerId);
      if (!response.success) {
        window.location.href = CLIENT_URL;
        return;
      }

      connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: newRoomId });
      connectionDispatch({ type: connectionReducerCases.SET_PLAYER_ID, playerId: newPlayerId });
    }

    join();
  }, [socket, connectionDispatch]);
}

async function joinRoom(socket: Socket, roomId: RoomId, playerId: PlayerId): Promise<EventResponse<undefined>> {
  return socket.emitWithAck(ConnectionSocketEvents.JOIN_ROOM, { roomId, playerId });
}