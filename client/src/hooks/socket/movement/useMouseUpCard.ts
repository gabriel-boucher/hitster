import {useCallback} from "react";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import {movementReducerCases} from "../../../stateProvider/movement/MovementReducerCases.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import useAddCurrentCard from "../game/useAddCurrentCard.ts";
import useReturnCurrentCard from "../game/useReturnCurrentCard.ts";

export default function useMouseUpCard() {
    const [{ playerId }] = useConnectionStateProvider();
    const [{ currentPlayerId, currentCardStatus }, dispatchGameState] = useGameStateProvider();
    const [{ isDragging }, dispatchMovementState] = useMovementStateProvider();

    const addCurrentCard = useAddCurrentCard();
    const returnCurrentCard = useReturnCurrentCard();

    return useCallback(() => {
        if (playerId !== currentPlayerId) return;
        if (!isDragging) return;

        dispatchMovementState({ type: movementReducerCases.SET_IS_DRAGGING, isDragging: false });
        dispatchMovementState({ type: movementReducerCases.SET_DRAGGING_POSITION, draggingPosition: { x: 0, y: 0 } });

        if (currentCardStatus === ItemStatus.MOVING_IN_CURRENT_DECK) {
            dispatchGameState({ type: gameReducerCases.SET_CURRENT_CARD_STATUS, currentCardStatus: ItemStatus.ACTIVE_IN_CURRENT_DECK });
            addCurrentCard();
        } else if (currentCardStatus === ItemStatus.BOARD) {
            dispatchGameState({ type: gameReducerCases.SET_CURRENT_CARD_STATUS, currentCardStatus: ItemStatus.UNUSED });
            returnCurrentCard();
        }

    },
    [playerId, currentPlayerId, currentCardStatus, isDragging, dispatchGameState, dispatchMovementState, addCurrentCard, returnCurrentCard]);
}