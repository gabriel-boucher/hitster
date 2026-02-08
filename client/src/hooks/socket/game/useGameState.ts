import {useEffect} from "react";
import {EventResponse} from "../../../type/EventResponse.ts";
import {GameState} from "../../../type/game/GameState.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {roomReducerCases} from "../../../stateProvider/room/RoomReducerCases.ts";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {GameSocketEvents} from "./gameSocketEvents.ts";

export default function useGameState() {
  const [{ socket }, connectionDispatch] = useConnectionStateProvider();
  const [{ }, roomDispatch] = useRoomStateProvider();
  const [{ }, gameDispatch] = useGameStateProvider();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleGameState = (response: EventResponse<GameState>) => {
      console.log(response.data)
      const gameState = response.data;

      if (response.success && gameState) {
        connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: gameState.id });
        gameDispatch({ type: gameReducerCases.SET_GAME_STATUS, gameStatus: gameState.status });
        roomDispatch({ type: roomReducerCases.SET_PLAYERS, players: gameState.players });
        gameDispatch({ type: gameReducerCases.SET_ITEMS, items: gameState.currentDeck });
        gameDispatch({ type: gameReducerCases.SET_CURRENT_CARD_ID, currentCardId: gameState.currentCardId });
        gameDispatch({ type: gameReducerCases.SET_CURRENT_CARD_STATUS, currentCardStatus: gameState.currentCardStatus });
        gameDispatch({ type: gameReducerCases.SET_CURRENT_PLAYER_ID, currentPlayerId: gameState.currentPlayerId });
      }
    };

    socket.on(GameSocketEvents.GAME_STATE, handleGameState);

    return () => {
      socket.off(GameSocketEvents.GAME_STATE, handleGameState);
    }
  }, [socket, connectionDispatch, roomDispatch, gameDispatch]);
}