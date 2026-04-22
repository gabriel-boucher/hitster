import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { EventResponse } from "../../../type/EventResponse.ts";
import { TokenId } from "../../../type/item/Token.ts";
import {GameState} from "../../../type/game/GameState.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import {RoomId} from "../../../type/room/RoomState.ts";

export default function useRemoveToken() {
    const [{ roomId, playerId }] = useConnectionStateProvider();

    return useCallback(async (tokenId: TokenId) => {
        try {
            await removeToken(roomId, playerId, tokenId);
        } catch (error) {
            console.error("Failed to remove token", error);
        }
    }, [roomId, playerId]);
}

async function removeToken(gameId: RoomId, playerId: PlayerId, tokenId: TokenId): Promise<EventResponse<GameState>> {
    const response = await axios.post(
        `${HTTP_SERVER_URL}/api/game/${GameHttpEvents.REMOVE_TOKEN}`,
        {
            gameId,
            playerId,
            tokenId,
        }
    );
    return response.data;
}

