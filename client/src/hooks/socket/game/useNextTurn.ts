import {useCallback} from "react";
import {GameSocketEvents} from "./gameSocketEvents.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";

export default function useNextTurn() {
    const [{ socket, roomId, playerId }] = useConnectionStateProvider();
    const [{ currentCardStatus }] = useGameStateProvider();

    return useCallback(() => {
        if (currentCardStatus == ItemStatus.ACTIVE_IN_CURRENT_DECK) {
            socket.emit(GameSocketEvents.NEXT_TURN, {
                gameId: roomId,
                playerId
            });
        }
    }, [socket, roomId, playerId, currentCardStatus]);
}