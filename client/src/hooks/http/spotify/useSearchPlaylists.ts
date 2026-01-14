import { useState, useEffect } from "react";
import searchPlaylists from "src/api/searchPlaylists";
import { useDebounce } from "src/hooks/useDebounce";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {Playlist} from "../../../type/spotify/Playlist.ts";

interface UseSearchPlaylistsSearch {
  searchedPlaylists: Playlist[];
  loading: boolean;
  query: string;
  setQuery: (query: string) => void;
}

export default function useSearchPlaylists (): UseSearchPlaylistsSearch {
  const [{ roomId, playerId }] = useStateProvider();
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