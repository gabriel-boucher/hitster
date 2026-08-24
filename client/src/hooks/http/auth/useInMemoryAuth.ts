import { useCallback } from "react";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";
import { MusicHttpEvents } from "../music/musicHttpEvents.ts";

export default function useInMemoryAuth() {
    const [{ roomId }] = useConnectionStateProvider();

    return useCallback(async () => {
       await inMemoryAuth(roomId);
    }, [roomId]);
}

async function inMemoryAuth(gameId: RoomId): Promise<void> {
    await api.post(apiPaths.musicAuth(gameId, MusicHttpEvents.IN_MEMORY_AUTH), { accessCode: "" });
}
