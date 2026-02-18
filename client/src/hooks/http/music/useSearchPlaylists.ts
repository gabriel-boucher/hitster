import { Dispatch, SetStateAction, useCallback } from "react";
import { Playlist } from "../../../type/music/Playlist.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import axios from "axios";
import { MusicHttpEvents } from "./musicHttpEvents.ts";
import {useDebouncedCallback} from "../../useDebounceCallback.ts";
import {EventResponse} from "../../../type/EventResponse.ts";

interface Props {
  setSearchedPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  delay?: number;
}

export default function useSearchPlaylists({ setSearchedPlaylists, setLoading, delay = 500 }: Props) {
  const [{ roomId, playerId }] = useConnectionStateProvider();

  const search = useCallback(async (query: string) => {
    const response = await searchPlaylists(roomId, playerId, query);
    const playlists = response.data?.playlists || [];
    setSearchedPlaylists(playlists);
    setLoading(false);
  }, [roomId, playerId, setSearchedPlaylists, setLoading]);

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

async function searchPlaylists(roomId: string, playerId: string, query: string): Promise<EventResponse<{ playlists: Playlist[]}>> {
  const response = await axios.get(
      `${HTTP_SERVER_URL}/api/music/${MusicHttpEvents.SEARCH_PLAYLISTS}`,
      {
        params: { query },
        headers: {
          "x-room-id": roomId,
          "x-player-id": playerId,
        },
      }
  );

  return response.data;
}