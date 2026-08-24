import { Dispatch, SetStateAction, useCallback } from "react";
import { Playlist } from "../../../type/music/Playlist.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { useDebouncedCallback } from "../../useDebounceCallback.ts";
import { EventResponse } from "../../../type/EventResponse.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

interface Props {
  setSearchedPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  delay?: number;
}

export default function useSearchPlaylists({ setSearchedPlaylists, setLoading, delay = 500 }: Props) {
  const [{ roomId }] = useConnectionStateProvider();

  const search = useCallback(async (query: string) => {
    const response = await searchPlaylists(roomId, query);
    const playlists = response.data?.playlists || [];
    setSearchedPlaylists(playlists);
    setLoading(false);
  }, [roomId, setSearchedPlaylists, setLoading]);

  const debouncedSearch = useDebouncedCallback(delay, search);

  return useCallback((query: string) => {
    if (!query.trim()) {
      setSearchedPlaylists([]);
      return;
    }

    setLoading(true);
    debouncedSearch(query);
  }, [debouncedSearch, setSearchedPlaylists, setLoading]);
}

async function searchPlaylists(gameId: RoomId, query: string): Promise<EventResponse<{ playlists: Playlist[]}>> {
  const response = await api.get(apiPaths.searchPlaylists(gameId), { params: { query } });
  return response.data;
}
