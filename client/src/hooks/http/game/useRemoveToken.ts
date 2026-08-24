import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { EventResponse } from "../../../type/EventResponse.ts";
import { TokenId } from "../../../type/item/Token.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useRemoveToken() {
    const [{ roomId }] = useConnectionStateProvider();

    return useCallback(async (tokenId: TokenId) => {
        try {
            await removeToken(roomId, tokenId);
        } catch (error) {
            console.error("Failed to remove token", error);
        }
    }, [roomId]);
}

async function removeToken(gameId: RoomId, tokenId: TokenId): Promise<EventResponse<string>> {
    const response = await api.post(apiPaths.tokenMovement(gameId, GameHttpEvents.REMOVE_TOKEN), { tokenId, position: 0 });
    return response.data;
}
