import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { EventResponse } from "../../../type/EventResponse.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useReturnCurrentCard() {
    const [{ roomId }] = useConnectionStateProvider();

    return useCallback(async () => {
        try {
            console.log("return");
            await returnCurrentCard(roomId);
        } catch (error) {
            console.error("Failed to return current card", error);
        }
    }, [roomId]);
}

async function returnCurrentCard(gameId: RoomId): Promise<EventResponse<string>> {
    const response = await api.post(apiPaths.cardMovement(gameId, GameHttpEvents.RETURN_CARD), { position: 0 });
    return response.data;
}
