import {useCallback} from "react";
import {GameSocketEvents} from "./gameSocketEvents.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {TokenId} from "../../../type/item/Token.ts";

export default function useAddToken() {
    const [{ socket, roomId, playerId }] = useConnectionStateProvider();

    return useCallback((tokenId: TokenId, position: number) => {
        if (!socket) return;

        socket.emit(GameSocketEvents.ADD_TOKEN, {
            gameId: roomId,
            playerId,
            tokenId,
            position
        });
    }, [socket, roomId, playerId]);
}