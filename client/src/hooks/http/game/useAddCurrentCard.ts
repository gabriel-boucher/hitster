import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { EventResponse } from "../../../type/EventResponse.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useAddCurrentCard() {
    const [{ roomId }] = useConnectionStateProvider();

    return useCallback(async () => {
        try {
            console.log("add")
            await addCurrentCard(roomId);
        } catch (error) {
            console.error("Failed to add current card", error);
        }
    }, [roomId]);
}

async function addCurrentCard(gameId: RoomId): Promise<EventResponse<string>> {
    const response = await api.post(apiPaths.cardMovement(gameId, GameHttpEvents.ADD_CARD), { position: 0 });
    return response.data;
}
