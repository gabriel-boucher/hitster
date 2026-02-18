import { useCallback } from "react";
import axios from "axios";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { SPOTIFY_AUTH_URL } from "../../../config/spotifyAuth.ts";
import { EventResponse } from "../../../type/EventResponse.ts";

export default function useSpotifyAuth() {
    const [{ roomId, playerId }] = useConnectionStateProvider();

    return useCallback(async () => {
        // If already authenticated, send empty string and call success
        const response = await spotifyAuth(roomId, playerId, "");
        if (response.success) return;

        const width = 500;
        const height = 700;
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;

        const popup = window.open(
            SPOTIFY_AUTH_URL,
            'Spotify Authorization',
            `width=${width},height=${height},left=${left},top=${top}`
        );

        if (!popup) return;

        const messageHandler = async (event: MessageEvent) => {
            if (event.origin !== window.location.origin) return;

            if (event.data.success !== undefined) {
                window.removeEventListener('message', messageHandler);
                popup.close();
            }
            if (event.data.success && event.data.code) {
                await spotifyAuth(roomId, playerId, event.data.code);
            }
        };

        window.addEventListener('message', messageHandler);
    }, [roomId, playerId]);
}

async function spotifyAuth(roomId: string, playerId: string, spotifyAccessCode: string): Promise<EventResponse<undefined>> {
    const response = await axios.post(
        `${HTTP_SERVER_URL}/api/auth/spotify`,
        {
            roomId,
            playerId,
            spotifyAccessCode,
        }
    );
    return response.data;
}