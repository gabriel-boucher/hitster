import { useState, useEffect } from "react";
import { useDebounce } from "src/hooks/useDebounce";
import {Playlist} from "../../../type/spotify/Playlist.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {HTTP_SERVER_URL} from "../../../config/url.ts";
import axios from "axios";

interface UseSearchPlaylistsSearch {
  searchedPlaylists: Playlist[];
  loading: boolean;
  query: string;
  setQuery: (query: string) => void;
}

export default function useSearchPlaylists (): UseSearchPlaylistsSearch {
  const [{ roomId, playerId }] = useConnectionStateProvider();
  const [query, setQuery] = useState("");
  const [searchedPlaylists, setSearchedPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setLoading(false);
      setSearchedPlaylists([]);
      return;
    }

    const fetchPlaylists = async () => {
      setLoading(true);
      const playlistsResponse = await searchPlaylists(roomId, playerId, debouncedQuery);
      setSearchedPlaylists(playlistsResponse);
      setLoading(false);
    };

    fetchPlaylists();
  }, [roomId, debouncedQuery]);

  return { searchedPlaylists, loading, query, setQuery };
};

async function searchPlaylists(roomId: string, playerId: string, query: string): Promise<Playlist[]> {
  const response = await axios.get(
      `${HTTP_SERVER_URL}/api/spotify/search-playlists`,
      {
        params: { query },
        headers: {
          "x-room-id": roomId,
          "x-player-id": playerId,
        },
      }
  );

  return response.data.playlists;
}