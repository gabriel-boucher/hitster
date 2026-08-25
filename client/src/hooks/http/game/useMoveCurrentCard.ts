import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { EventResponse } from "../../../type/EventResponse.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useMoveCurrentCard() {
    const [{ roomId }] = useConnectionStateProvider();

    return useCallback(async (position: number) => {
        try {
            await moveCurrentCard(roomId, position);
        } catch (error) {
            console.error("Failed to move current card", error);
        }
    }, [roomId]);
}

async function moveCurrentCard(gameId: RoomId, position: number): Promise<EventResponse<string>> {
    const response = await api.post(apiPaths.cardMovement(gameId, GameHttpEvents.MOVE_CARD), { position });
    return response.data;
}
