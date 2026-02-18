import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useCallback} from "react";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import useRemoveCurrentCard from "../game/useRemoveCurrentCard.ts";

export default function useMouseDragLeaveDeck() {
    const [{ playerId }] = useConnectionStateProvider();
    const [{ items, currentPlayerId, currentCardId }, dispatchGameState] = useGameStateProvider();
    const [{ isDragging }] = useMovementStateProvider();

    const removeCurrentCard = useRemoveCurrentCard();

    return useCallback(() => {
        if (!isDragging) return
        if (playerId !== currentPlayerId) return;

        const newItems = items.filter((item => item.id !== currentCardId));
        dispatchGameState({type: gameReducerCases.SET_ITEMS, items: newItems});
        dispatchGameState({type: gameReducerCases.SET_CURRENT_CARD_STATUS, currentCardStatus: ItemStatus.BOARD});

        removeCurrentCard();
    }, [
        isDragging,
        items,
        currentPlayerId,
        currentCardId,
        playerId,
        dispatchGameState,
        removeCurrentCard
    ]);
}