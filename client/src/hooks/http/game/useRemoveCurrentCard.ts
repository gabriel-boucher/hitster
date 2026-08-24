import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { EventResponse } from "../../../type/EventResponse.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useRemoveCurrentCard() {
    const [{ roomId }] = useConnectionStateProvider();

    return useCallback(async () => {
        try {
            console.log("remove")
            await removeCurrentCard(roomId);
        } catch (error) {
            console.error("Failed to remove current card", error);
        }
    }, [roomId]);
}

async function removeCurrentCard(gameId: RoomId): Promise<EventResponse<string>> {
    const response = await api.post(apiPaths.cardMovement(gameId, GameHttpEvents.REMOVE_CARD), { position: 0 });
    return response.data;
}
