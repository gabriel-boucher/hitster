import {useEffect} from "react";
import {reducerCases} from "../../../utils/constants.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {EventResponse} from "../../../type/EventResponse.ts";
import {RoomSocketEvents} from "../room/roomSocketEvents.ts";
import {GameState} from "../../../type/game/GameState.ts";

export default function useGameState() {
  const [{ socket }, dispatch] = useStateProvider();

  useEffect(() => {
    if (!socket) {
      return;
    }

    const handleGameState = (response: EventResponse<GameState>) => {
      const gameState = response.data;
      if (response.success && gameState) {
        dispatch({ type: reducerCases.SET_ROOM_ID, roomId: gameState.id });
        dispatch({ type: reducerCases.SET_GAME_STATUS, gameStatus: gameState.status });
        dispatch({ type: reducerCases.SET_PLAYERS, players: gameState.players });
        dispatch({ type: reducerCases.SET_ITEMS, items: gameState.currentDeck });
      }
    };

    socket.on(RoomSocketEvents.GAME_STATE, handleGameState);

    return () => {
      socket.off(RoomSocketEvents.GAME_STATE, handleGameState);
    }
  }, [socket, dispatch]);
}