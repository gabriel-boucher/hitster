import { useState, useEffect } from "react";
import searchPlaylists from "src/api/searchPlaylists";
import { useDebounce } from "src/hooks/useDebounce";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {Playlist} from "../../../type/spotify/Playlist.ts";

interface UseSearchPlaylistsSearch {
  playlists: Playlist[];
  loading: boolean;
  query: string;
  setQuery: (query: string) => void;
}

export default function useSearchPlaylists (): UseSearchPlaylistsSearch {
  const [{ roomId, playerId }] = useStateProvider();
  const [query, setQuery] = useState("");
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setLoading(false);
      setPlaylists([]);
      return;
    }

    const fetchPlaylists = async () => {
      setLoading(true);
      const playlistsResponse = await searchPlaylists(roomId, playerId, debouncedQuery);
      setPlaylists(playlistsResponse);
      setLoading(false);
    };

    fetchPlaylists();
  }, [roomId, debouncedQuery]);

  return { playlists, loading, query, setQuery };
};