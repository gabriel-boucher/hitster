import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { useGameStateProvider } from "../../../stateProvider/game/GameStateProvider.tsx";
import { ItemStatus } from "../../../type/item/ItemStatus.ts";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { EventResponse } from "../../../type/EventResponse.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {GameState} from "../../../type/game/GameState.ts";

export default function useNextTurn() {
    const [{ roomId, playerId }] = useConnectionStateProvider();
    const [{ currentCardStatus }] = useGameStateProvider();

    return useCallback(async () => {
        if (currentCardStatus !== ItemStatus.ACTIVE_IN_CURRENT_DECK) return;

        try {
            await nextTurn(roomId, playerId);
        } catch (error) {
            console.error("Failed to advance turn", error);
        }
    }, [roomId, playerId, currentCardStatus]);
}

async function nextTurn(gameId: RoomId, playerId: PlayerId): Promise<EventResponse<GameState>> {
    const response = await axios.post(
        `${HTTP_SERVER_URL}/api/game/${GameHttpEvents.NEXT_TURN}`,
        {
            gameId,
            playerId,
        }
    );
    return response.data;
}

