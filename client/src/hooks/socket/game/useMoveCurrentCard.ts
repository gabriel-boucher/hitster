import {useCallback} from "react";
import {GameSocketEvents} from "./gameSocketEvents.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useMoveCurrentCard() {
    const [{ socket, roomId, playerId }] = useConnectionStateProvider();

    return useCallback((position: number) => {
        socket.emit(GameSocketEvents.MOVE_CURRENT_CARD, {
            gameId: roomId,
            playerId,
            position
        });
    }, [socket, roomId, playerId]);
}