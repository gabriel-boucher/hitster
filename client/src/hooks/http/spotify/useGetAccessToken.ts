import {useCallback} from "react";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import axios from "axios";
import {HTTP_SERVER_URL} from "../../../config/url.ts";

export default function useGetAccessToken() {
    const [{ roomId, playerId }] = useConnectionStateProvider();

    return useCallback(async () => {
        const response = await axios.get(
            `${HTTP_SERVER_URL}/api/spotify/access-token`,
            {
                headers: {
                    "x-room-id": roomId,
                    "x-player-id": playerId,
                },
            }
        );
        return response.data.accessToken;
    }, [roomId, playerId]);
}