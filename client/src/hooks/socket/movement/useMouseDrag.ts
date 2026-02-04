import {useCallback} from "react";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import {movementReducerCases} from "../../../stateProvider/movement/MovementReducerCases.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";

export default function useMouseDrag() {
    const [{ playerId }] = useConnectionStateProvider();
    const [{ currentPlayerId }] = useGameStateProvider();
    const [{ isDragging, currentCardWidth }, dispatchMovementState] = useMovementStateProvider();

    return useCallback((e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        if (playerId !== currentPlayerId) return;

        requestAnimationFrame(() => {
            const halfWidth = currentCardWidth / 2;
            const halfHeight = currentCardWidth / 2;

            const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
            const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

            const clampedX = Math.max(halfWidth, Math.min(clientX, window.innerWidth - halfWidth - 3));
            const clampedY = Math.max(halfHeight, Math.min(clientY, window.innerHeight - halfHeight  - 3));

            dispatchMovementState({ type: movementReducerCases.SET_DRAGGING_POSITION, draggingPosition: { x: clampedX, y: clampedY } });
        });
    },
    [isDragging, currentCardWidth, dispatchMovementState, playerId, currentPlayerId]);
}