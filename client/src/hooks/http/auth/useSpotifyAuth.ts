import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { SPOTIFY_AUTH_URL } from "../../../config/spotifyAuth.ts";
import { EventResponse } from "../../../type/EventResponse.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";
import { MusicHttpEvents } from "../music/musicHttpEvents.ts";

export default function useSpotifyAuth() {
    const [{ roomId }] = useConnectionStateProvider();

    return useCallback(async () => {
        // If already authenticated, send empty string and call success
        const response = await spotifyAuth(roomId, "");
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
                await spotifyAuth(roomId, event.data.code);
            }
        };

        window.addEventListener('message', messageHandler);
    }, [roomId]);
}

async function spotifyAuth(gameId: RoomId, accessCode: string): Promise<EventResponse<string>> {
    const response = await api.post(apiPaths.musicAuth(gameId, MusicHttpEvents.SPOTIFY_AUTH), { accessCode });
    return response.data;
}
