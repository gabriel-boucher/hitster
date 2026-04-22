import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { EventResponse } from "../../../type/EventResponse.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {GameState} from "../../../type/game/GameState.ts";

export default function useMoveCurrentCard() {
    const [{ roomId, playerId }] = useConnectionStateProvider();

    return useCallback(async (position: number) => {
        try {
            await moveCurrentCard(roomId, playerId, position);
        } catch (error) {
            console.error("Failed to move current card", error);
        }
    }, [roomId, playerId]);
}

async function moveCurrentCard(gameId: RoomId, playerId: PlayerId, position: number): Promise<EventResponse<GameState>> {
    const response = await axios.post(
        `${HTTP_SERVER_URL}/api/game/${GameHttpEvents.MOVE_CURRENT_CARD}`,
        {
            gameId,
            playerId,
            position,
        }
    );
    return response.data;
}

