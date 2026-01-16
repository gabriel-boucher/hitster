import {useEffect} from "react";
import {EventResponse} from "../../../type/EventResponse.ts";
import {RoomSocketEvents} from "../room/roomSocketEvents.ts";
import {GameState} from "../../../type/game/GameState.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {roomReducerCases} from "../../../stateProvider/room/RoomReducerCases.ts";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";

export default function useGameState() {
  const [{ socket }, connectionDispatch] = useConnectionStateProvider();
  const [{ }, roomDispatch] = useRoomStateProvider();
  const [{ }, gameDispatch] = useGameStateProvider();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleGameState = (response: EventResponse<GameState>) => {
      const gameState = response.data;
      if (response.success && gameState) {
        connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: gameState.id });
        gameDispatch({ type: gameReducerCases.SET_GAME_STATUS, gameStatus: gameState.status });
        roomDispatch({ type: roomReducerCases.SET_PLAYERS, players: gameState.players });
        gameDispatch({ type: gameReducerCases.SET_ITEMS, items: gameState.currentDeck });
      }
    };

    socket.on(RoomSocketEvents.GAME_STATE, handleGameState);

    return () => {
      socket.off(RoomSocketEvents.GAME_STATE, handleGameState);
    }
  }, [socket, connectionDispatch, roomDispatch, gameDispatch]);
}