import {useCallback} from "react";
import {GameSocketEvents} from "./gameSocketEvents.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useReturnCurrentCard() {
    const [{ socket, roomId, playerId }] = useConnectionStateProvider();

    return useCallback(() => {
        if (!socket) return;

        socket.emit(GameSocketEvents.RETURN_CURRENT_CARD, {
            gameId: roomId,
            playerId,
        });
    }, [socket, roomId, playerId]);
}