import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { EventResponse } from "../../../type/EventResponse.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {GameState} from "../../../type/game/GameState.ts";

export default function useReturnCurrentCard() {
    const [{ roomId, playerId }] = useConnectionStateProvider();

    return useCallback(async () => {
        try {
            await returnCurrentCard(roomId, playerId);
        } catch (error) {
            console.error("Failed to return current card", error);
        }
    }, [roomId, playerId]);
}

async function returnCurrentCard(gameId: RoomId, playerId: PlayerId): Promise<EventResponse<GameState>> {
    const response = await axios.post(
        `${HTTP_SERVER_URL}/api/game/${GameHttpEvents.RETURN_CURRENT_CARD}`,
        {
            gameId,
            playerId,
        }
    );
    return response.data;
}

