import {useCallback} from "react";
import {GameSocketEvents} from "./gameSocketEvents.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {TokenId} from "../../../type/item/Token.ts";

export default function useRemoveToken() {
    const [{ socket, roomId, playerId }] = useConnectionStateProvider();

    return useCallback((tokenId: TokenId) => {
        if (!socket) return;

        socket.emit(GameSocketEvents.REMOVE_TOKEN, {
            gameId: roomId,
            playerId,
            tokenId
        });
    }, [socket, roomId, playerId]);
}