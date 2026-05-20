import {useEffect} from "react";
import {PlayerId} from "../../../type/player/Player.ts";
import {EventResponse} from "../../../type/EventResponse.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {HTTP_SERVER_URL} from "../../../config/url.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import axios from "axios";
import {RoomHttpEvents} from "./roomHttpEvents.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useResetAllStates} from "../../useResetAllStates.ts";

export default function useJoinRoom() {
  const [{ socket }, connectionDispatch] = useConnectionStateProvider();
  const location = useLocation();
  const navigate = useNavigate();
  const resetAllStates = useResetAllStates();

  useEffect(() => {
    const newRoomId: RoomId = location.pathname.substring(1) || "";
    if (!socket || !newRoomId) return;

    const join = async () => {
      if (!socket.id) return;

      const playerId: PlayerId = localStorage.getItem("playerId") || "";

      const response = await joinRoom(newRoomId, playerId, socket.id);
      const newPlayerId = response.data;
      if (!response.success || !newPlayerId) {
        navigate("/");
        resetAllStates();
        return;
      }

      connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: newRoomId });
      connectionDispatch({ type: connectionReducerCases.SET_PLAYER_ID, playerId: newPlayerId });
      localStorage.setItem("playerId", newPlayerId);
    }

    join();
  }, [socket, location, navigate, resetAllStates, connectionDispatch]);
}

async function joinRoom(gameId: RoomId, playerId: PlayerId, socketId: string): Promise<EventResponse<PlayerId>> {
  const response = await axios.post(
      `${HTTP_SERVER_URL}/api/room/${RoomHttpEvents.JOIN_ROOM}`,
      {
        gameId,
        playerId,
        socketId
      }
  );
  return response.data;
}