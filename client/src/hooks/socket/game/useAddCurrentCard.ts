import {useCallback} from "react";
import {GameSocketEvents} from "./gameSocketEvents.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useAddCurrentCard() {
    const [{ socket, roomId, playerId }] = useConnectionStateProvider();

    return useCallback(() => {
        socket.emit(GameSocketEvents.ADD_CURRENT_CARD, {
            gameId: roomId,
            playerId,
        });
    }, [socket, roomId, playerId]);
}