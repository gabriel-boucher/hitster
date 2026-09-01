import {useCallback} from "react";
import {EventResponse} from "../../../type/EventResponse.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {PlayerId} from "../../../type/player/Player.ts";
import {useNavigate} from "react-router-dom";
import {useResetAllStates} from "../../useResetAllStates.ts";
import {apiPaths} from "../../../config/apiPaths.ts";
import {api} from "../apiRequest.ts";
import {decodeAuthToken, setAuthToken} from "../authToken.ts";

export default function useJoinGame() {
  const [{ socket, roomId }, connectionDispatch] = useConnectionStateProvider();
  const navigate = useNavigate();
  const resetAllStates = useResetAllStates();

  return useCallback(async (username: string) => {
    if (!socket || !roomId) return;

    const join = async () => {
      if (!socket.id) return;

      const playerId: PlayerId = localStorage.getItem("playerId") || "";

      const response = await joinGame(roomId, socket.id, playerId, username);
      const token = response.data;
      const decoded = token ? decodeAuthToken(token) : null;
      if (!response.success || !token || !decoded) {
        navigate("/");
        resetAllStates();
        return;
      }

      setAuthToken(token);
      connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: decoded.gameId });
      connectionDispatch({ type: connectionReducerCases.SET_PLAYER_ID, playerId: decoded.playerId });
      localStorage.setItem("playerId", decoded.playerId);
      localStorage.setItem("playerName", username);
      navigate(`/${roomId}`);
    }

    await join();
  }, [socket, roomId, connectionDispatch, navigate, resetAllStates]);
}

async function joinGame(gameId: RoomId, socketId: string, playerId: PlayerId, username: string): Promise<EventResponse<string>> {
  const response = await api.post(apiPaths.joinGame(gameId), { socketId, playerId, playerName: username });
  return response.data;
}
