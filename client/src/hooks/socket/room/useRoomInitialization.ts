import { useEffect, useState } from "react";
import useJoinRoom from "./useJoinRoom";
import useCreateRoom from "./useCreateRoom";
import {ConnectionSocketEvents} from "../connection/connectionSocketEvents.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useRoomInitialization() {
  const [{ socket, roomId }] = useConnectionStateProvider();
  const [loading, setLoading] = useState(false);
  const joinRoom = useJoinRoom();
  const createRoom = useCreateRoom();

  useEffect(() => {
    const getPageParams = () => ({
      accessCode: new URLSearchParams(window.location.search).get("code"),
      roomId: window.location.pathname.substring(1) || ""
    });

    const handleComplete = () => {
      setTimeout(() => setLoading(false), 500);
    };

    const handleConnect = () => {
      const { accessCode, roomId: pageRoomId } = getPageParams();

      if (pageRoomId) {
        setLoading(true);
        joinRoom(pageRoomId, handleComplete);
      } else if (accessCode) {
        setLoading(true);
        createRoom(accessCode, handleComplete);
      }
    };

    if (socket.connected) {
      handleConnect();
    } else {
      socket.on(ConnectionSocketEvents.CONNECT, handleConnect);
    }

    return () => {
      socket.off(ConnectionSocketEvents.CONNECT, handleConnect);
    };
  }, [socket, roomId, joinRoom, createRoom]);

  return { loading, setLoading };
}