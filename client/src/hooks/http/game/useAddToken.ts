import { useCallback } from "react";
import { GameHttpEvents } from "./gameHttpEvents.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { EventResponse } from "../../../type/EventResponse.ts";
import { TokenId } from "../../../type/item/Token.ts";
import { PlayerId } from "../../../type/player/Player.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {GameState} from "../../../type/game/GameState.ts";

export default function useAddToken() {
    const [{ roomId, playerId }] = useConnectionStateProvider();

    return useCallback(async (tokenId: TokenId, position: number) => {
        try {
            await addToken(roomId, playerId, tokenId, position);
        } catch (error) {
            console.error("Failed to add token", error);
        }
    }, [roomId, playerId]);
}

async function addToken(gameId: RoomId, playerId: PlayerId, tokenId: TokenId, position: number): Promise<EventResponse<GameState>> {
    const response = await axios.post(
        `${HTTP_SERVER_URL}/api/game/${GameHttpEvents.ADD_TOKEN}`,
        {
            gameId,
            playerId,
            tokenId,
            position,
        }
    );
    return response.data;
}

