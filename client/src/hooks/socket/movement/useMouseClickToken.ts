import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useCallback} from "react";
import {Token} from "../../../type/item/Token.ts";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {roomReducerCases} from "../../../stateProvider/room/RoomReducerCases.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import useAddToken from "../game/useAddToken.ts";
import useRemoveToken from "../game/useRemoveToken.ts";
import {Player} from "../../../type/player/Player.ts";
import * as React from "react";
import {RoomAction} from "../../../stateProvider/room/RoomAction.ts";

export default function useMouseClickToken() {
    const [{ playerId }] = useConnectionStateProvider();
    const [{ players }, dispatchRoomState] = useRoomStateProvider();
    const [{ items, currentPlayerId }, dispatchGameState] = useGameStateProvider();

    const addToken = useAddToken();
    const removeToken = useRemoveToken();

    return useCallback((clickToken: Token) => {
        if (playerId === currentPlayerId) return;
        if (playerId !== clickToken.ownerId) return;

        const isMovingInCurrentDeck = clickToken.status === ItemStatus.MOVING_IN_CURRENT_DECK;
        const newClickToken = {
            ...clickToken,
            status: isMovingInCurrentDeck ? ItemStatus.ACTIVE_IN_CURRENT_DECK : ItemStatus.MOVING_IN_CURRENT_DECK
        };

        const newItems = items.map(item => item.id === clickToken.id ? newClickToken : item);
        dispatchGameState({ type: gameReducerCases.SET_ITEMS, items: newItems });

        dispatchTokenState(players, playerId, clickToken, newClickToken, dispatchRoomState);

        if (isMovingInCurrentDeck) {
            const newIndex = items.findIndex(item => item.id === clickToken.id);
            addToken(newClickToken.id, newIndex);
        } else {
            removeToken(newClickToken.id);
        }
    },
    [players, items, playerId, currentPlayerId, addToken, removeToken, dispatchGameState, dispatchRoomState]);
}

function dispatchTokenState(players: Player[], playerId: string, clickToken: Token, newClickToken: Token, dispatchRoomState: React.Dispatch<RoomAction>) {
    const newPlayers = players.map((player) =>
        player.id === playerId ?
            {
                ...player,
                deck: {
                    ...player.deck,
                    tokens: player.deck.tokens.map((token) =>
                        token.id === clickToken.id ? newClickToken : token
                    ),
                },
            }
            : player
    );
    dispatchRoomState({ type: roomReducerCases.SET_PLAYERS, players: newPlayers });
}