import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { EventResponse } from "../../../type/EventResponse.ts";
import { TokenId } from "../../../type/item/Token.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useAddToken() {
    const [{ roomId }] = useConnectionStateProvider();

    return useCallback(async (tokenId: TokenId, position: number) => {
        try {
            await addToken(roomId, tokenId, position);
        } catch (error) {
            console.error("Failed to add token", error);
        }
    }, [roomId]);
}

async function addToken(gameId: RoomId, tokenId: TokenId, position: number): Promise<EventResponse<string>> {
    const response = await api.post(apiPaths.tokenMovement(gameId, GameHttpEvents.ADD_TOKEN), { tokenId, position });
    return response.data;
}
