import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { useGameStateProvider } from "../../../stateProvider/game/GameStateProvider.tsx";
import { ItemStatus } from "../../../type/item/ItemStatus.ts";
import { EventResponse } from "../../../type/EventResponse.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

export default function useNextTurn() {
    const [{ roomId }] = useConnectionStateProvider();
    const [{ currentCardStatus }] = useGameStateProvider();

    return useCallback(async () => {
        console.log(currentCardStatus)
        if (currentCardStatus !== ItemStatus.ACTIVE_IN_CURRENT_DECK) return;

        try {
            await nextTurn(roomId);
        } catch (error) {
            console.error("Failed to advance turn", error);
        }
    }, [roomId, currentCardStatus]);
}

async function nextTurn(gameId: RoomId): Promise<EventResponse<string>> {
    const response = await api.post(apiPaths.nextTurn(gameId));
    return response.data;
}
