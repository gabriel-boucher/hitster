import {useCallback} from "react";
import {EventResponse} from "../../../type/EventResponse.ts";
import {CreateRoomResponse} from "../../../type/room/CreateRoomResponse.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {useNavigate} from "react-router-dom";
import {apiPaths} from "../../../config/apiPaths.ts";
import {api} from "../apiRequest.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {GameStatus} from "../../../type/game/GameState.ts";

export default function useCreateRoom() {
  const [, connectionDispatch] = useConnectionStateProvider();
  const [, gameDispatch] = useGameStateProvider();
  const navigate = useNavigate();

  return useCallback(async () => {
    const response = await createRoom();
    if (!response.success || !response.data) return;

    const roomId: RoomId = response.data.gameId;
    connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId });
    gameDispatch({ type: gameReducerCases.SET_GAME_STATUS, gameStatus: GameStatus.LOBBY });
    
    navigate("create");
  }, [connectionDispatch, gameDispatch, navigate]);
}

async function createRoom(): Promise<EventResponse<CreateRoomResponse>> {
  const response = await api.post(apiPaths.createRoom());
  return response.data;
}
