import {useCallback} from "react";
import {useConnectionStateProvider} from "../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useGameStateProvider} from "../../stateProvider/game/GameStateProvider.tsx";
import {Card} from "../../type/item/Card.ts";
import {gameReducerCases} from "../../stateProvider/game/GameReducerCases.ts";
import {ItemStatus} from "../../type/item/ItemStatus.ts";
import {Token} from "../../type/item/Token.ts";
import {roomReducerCases} from "../../stateProvider/room/RoomReducerCases.ts";
import {useRoomStateProvider} from "../../stateProvider/room/RoomStateProvider.tsx";
import {Player, PlayerId} from "../../type/player/Player.ts";
import getNewIndex, {Position} from "./getNewIndex.ts";
import * as React from "react";

export default function useMouseOverDeck() {
    const [{ playerId }] = useConnectionStateProvider();
    const [{ players }, dispatchRoomState] = useRoomStateProvider();
    const [{ items, currentPlayerId }, dispatchGameState] = useGameStateProvider();

    return useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, over: Card | Token, mousePosition: Position) => {
        if (playerId === currentPlayerId) return;
        const currentToken = getCurrentToken(players, playerId as PlayerId);
        if (!currentToken) return;
        if (over.id === currentToken.id) return
        e.stopPropagation();
        e.preventDefault();

        const newIndex = getNewIndex(e, items, over, currentToken.status, mousePosition);
        const { newItems, newPlayers } = getNewItems(items, currentToken, newIndex, players, playerId);
        dispatchGameState({ type: gameReducerCases.SET_ITEMS, items: newItems });

        dispatchRoomState({ type: roomReducerCases.SET_PLAYERS, players: newPlayers });
    },
    [players, items, currentPlayerId, playerId, dispatchGameState, dispatchRoomState]);
}

function getCurrentToken(players: Player[], playerId: PlayerId): Token | undefined {
    const player = players.find((player) => player.id === playerId);
    if (!player) return;

    const tokens = player.deck.tokens;

    return tokens.find((token) => token.status === ItemStatus.MOVING_IN_CURRENT_DECK) ??
        tokens.find((token) => token.status === ItemStatus.UNUSED);
}

function getNewItems(items: (Card | Token)[], token: Token, position: number, players: Player[], playerId: PlayerId) {
    const newToken = { ...token, status: ItemStatus.MOVING_IN_CURRENT_DECK };
    const newItems = items.filter((item) => item.id !== newToken.id);
    const prevPosition = position - 1;

    let newPlayers = [...players];

    if (!(prevPosition >= 0 && newItems[prevPosition].status == ItemStatus.ACTIVE_IN_CURRENT_DECK || // previous is a token or currentCard
        position < newItems.length && newItems[position].status == ItemStatus.ACTIVE_IN_CURRENT_DECK)) { // current is a token or currentCard
        newItems.splice(position, 0, newToken);

        newPlayers = players.map((player) =>
            player.id === playerId ?
                {
                    ...player,
                    deck: {
                        ...player.deck,
                        tokens: player.deck.tokens.map((token) =>
                            token.id === newToken.id ? newToken : token
                        ),
                    }
                }
                : player
        )
    }

    return { newItems, newPlayers };
}