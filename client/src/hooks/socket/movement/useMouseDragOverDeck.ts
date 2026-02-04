import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import * as React from "react";
import {useCallback} from "react";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {Card, CardId} from "../../../type/item/Card.ts";
import {Token} from "../../../type/item/Token.ts";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import getNewIndex from "./getNewIndex.ts";
import useMoveCurrentCard from "../game/useMoveCurrentCard.ts";
import useThrottle from "../../useThrottle.ts";

export default function useMouseDragOverDeck() {
    const [{ socket, roomId, playerId }] = useConnectionStateProvider();
    const [{ items, currentPlayerId, currentCardId, currentCardStatus }, dispatchGameState] = useGameStateProvider();
    const [{ isDragging }] = useMovementStateProvider();

    const canRun = useThrottle(50);
    const moveCurrentCard = useMoveCurrentCard();

    return useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, over: Card | Token) => {
        if (!canRun()) return;
        if (!isDragging) return;
        if (playerId !== currentPlayerId) return;
        if (over.id === currentCardId) return;

        const currentCard = createCurrentCard(currentCardId, currentCardStatus);

        const newIndex = getNewIndex(e, items, over, currentCardStatus);
        const newItems = getNewItems(items, currentCard, newIndex);
        dispatchGameState({ type: gameReducerCases.SET_ITEMS, items: newItems });

        dispatchGameState({ type: gameReducerCases.SET_CURRENT_CARD_STATUS, currentCardStatus: ItemStatus.MOVING_IN_CURRENT_DECK });

        moveCurrentCard(newIndex);
    },
    [
        socket,
        isDragging,
        playerId,
        currentCardId,
        currentCardStatus,
        roomId,
        currentPlayerId,
        items,
        dispatchGameState,
        canRun,
        moveCurrentCard
    ]);
}

function createCurrentCard(cardId: CardId, cardStatus: ItemStatus): Card {
    return {
        type: "card",
        id: cardId,
        status: cardStatus,
        song: "",
        artist: "",
        date: "",
        albumUrl: ""
    }
}

function getNewItems(items: (Card | Token)[], card: Card, position: number) {
    const newCard = { ...card, status: ItemStatus.MOVING_IN_CURRENT_DECK };
    const newItems = items.filter((item) => item.id !== newCard.id);
    const prevPosition = position - 1;

    if (prevPosition >= 0 && newItems[prevPosition].type === "token") { // previous is a token
        newItems.splice(prevPosition, 1);
        position--;
    }

    if (position < newItems.length && newItems[position].type === "token") { // current is a token
        newItems.splice(position, 1);
    }

    newItems.splice(position, 0, newCard);

    return newItems;
}
