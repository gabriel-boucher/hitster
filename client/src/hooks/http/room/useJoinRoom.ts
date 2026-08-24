import {useEffect} from "react";
import {EventResponse} from "../../../type/EventResponse.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {PlayerId} from "../../../type/player/Player.ts";
import {useLocation, useNavigate} from "react-router-dom";
import {useResetAllStates} from "../../useResetAllStates.ts";
import {apiPaths} from "../../../config/apiPaths.ts";
import {api} from "../apiRequest.ts";
import {decodeAuthToken, setAuthToken} from "../authToken.ts";

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
      const token = response.data;
      const decoded = token ? decodeAuthToken(token) : null;
      if (!response.success || !token || !decoded) {
        navigate("/");
        resetAllStates();
        return;
      }

      setAuthToken(token);
      connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: newRoomId });
      connectionDispatch({ type: connectionReducerCases.SET_PLAYER_ID, playerId: decoded.playerId });
      localStorage.setItem("playerId", decoded.playerId);
    }

    join();
  }, [socket, location, navigate, resetAllStates, connectionDispatch]);
}

async function joinRoom(gameId: RoomId, playerId: PlayerId, socketId: string): Promise<EventResponse<string>> {
  const response = await api.post(apiPaths.joinRoom(gameId), { socketId, playerId });
  return response.data;
}
