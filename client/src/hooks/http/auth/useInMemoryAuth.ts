import { useCallback } from "react";
import axios from "axios";
import {HTTP_SERVER_URL} from "../../../config/url.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";

export default function useInMemoryAuth() {
    const [{ roomId, playerId }] = useConnectionStateProvider();

    return useCallback(async () => {
       await inMemoryAuth(roomId, playerId);
    }, [roomId, playerId]);
}

async function inMemoryAuth(roomId: string, playerId: string): Promise<void> {
    await axios.post(
        `${HTTP_SERVER_URL}/api/auth/in-memory`,
        {
            roomId,
            playerId,
        }
    );
}