import {useCallback} from "react";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import {movementReducerCases} from "../../../stateProvider/movement/MovementReducerCases.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {Card} from "../../../type/item/Card.ts";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import * as React from "react";
import useMoveCurrentCard from "../game/useMoveCurrentCard.ts";

export default function useMouseDownCard() {
    const [{ playerId }] = useConnectionStateProvider();
    const [{ items, currentPlayerId, currentCardId, currentCardStatus }, dispatchGameState] = useGameStateProvider();
    const [, dispatchMovementState] = useMovementStateProvider();

    const moveCurrentCard = useMoveCurrentCard();

    return useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, downCard: Card) => {
        if (playerId !== currentPlayerId) return;
        if (downCard.id !== currentCardId) return;

        dispatchMovementState({ type: movementReducerCases.SET_IS_DRAGGING, isDragging: true });

        let clientX: number;
        let clientY: number;

        if ("touches" in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        dispatchMovementState({ type: movementReducerCases.SET_DRAGGING_POSITION, draggingPosition: {x: clientX, y: clientY} });

        if (currentCardStatus === ItemStatus.UNUSED) {
            dispatchGameState({ type: gameReducerCases.SET_CURRENT_CARD_STATUS, currentCardStatus: ItemStatus.BOARD });
        } else {
            dispatchGameState({ type: gameReducerCases.SET_CURRENT_CARD_STATUS, currentCardStatus: ItemStatus.MOVING_IN_CURRENT_DECK });
            const newIndex = items.findIndex(item => item.id === currentCardId);
            moveCurrentCard(newIndex);
        }
    },
    [playerId, items, currentPlayerId, currentCardId, currentCardStatus, dispatchGameState, dispatchMovementState, moveCurrentCard]);
}