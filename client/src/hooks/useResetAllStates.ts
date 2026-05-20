import {useCallback} from "react";
import {useResetConnectionState} from "../stateProvider/connection/ConnectionStateProvider.tsx";
import {useResetGameState} from "../stateProvider/game/GameStateProvider.tsx";
import {useResetRoomState} from "../stateProvider/room/RoomStateProvider.tsx";
import {useResetMovementState} from "../stateProvider/movement/MovementStateProvider.tsx";

export const useResetAllStates = () => {
  const resetConnection = useResetConnectionState();
  const resetGame = useResetGameState();
  const resetRoom = useResetRoomState();
  const resetMovement = useResetMovementState();

  return useCallback(() => {
    resetConnection();
    resetGame();
    resetRoom();
    resetMovement();
  }, [resetConnection, resetGame, resetRoom, resetMovement]);
};

