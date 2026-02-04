import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useCallback} from "react";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import {gameReducerCases} from "../../../stateProvider/game/GameReducerCases.ts";
import {roomReducerCases} from "../../../stateProvider/room/RoomReducerCases.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";

export default function useMouseLeaveDeck() {
    const [{ playerId }] = useConnectionStateProvider();
    const [{ players }, dispatchRoomState] = useRoomStateProvider();
    const [{ items, currentPlayerId }, dispatchGameState] = useGameStateProvider();

    return useCallback(() => {
        if (playerId === currentPlayerId) return;

        const newItems = items.filter((item) =>
            !(
                item.type === "token" &&
                item.ownerId === playerId &&
                item.status === ItemStatus.MOVING_IN_CURRENT_DECK
            )
        );
        dispatchGameState({ type: gameReducerCases.SET_ITEMS, items: newItems });

        const newPlayers = players.map(player =>
            player.id === playerId
                ? {
                    ...player,
                    deck: {
                        ...player.deck,
                        tokens: player.deck.tokens.map(token =>
                            token.status === ItemStatus.MOVING_IN_CURRENT_DECK
                                ? { ...token, status: ItemStatus.UNUSED }
                                : token
                        ),
                    },
                }
                : player
        );
        dispatchRoomState({ type: roomReducerCases.SET_PLAYERS, players: newPlayers });
    }, [
        players,
        items,
        playerId,
        currentPlayerId,
        dispatchGameState,
        dispatchRoomState,
    ]);
}