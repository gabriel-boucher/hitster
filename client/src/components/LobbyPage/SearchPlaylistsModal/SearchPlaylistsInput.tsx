import styled from "styled-components";
import {Dispatch, SetStateAction, useEffect, useRef} from "react";
import {Playlist} from "../../../type/music/Playlist.ts";
import useSearchPlaylists from "../../../hooks/http/music/useSearchPlaylists.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";

interface Props {
    searchedQuery: string;
    setSearchedQuery: Dispatch<SetStateAction<string>>;
    setSearchedPlaylists: Dispatch<SetStateAction<Playlist[]>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function SearchPlaylistsInput({ searchedQuery, setSearchedQuery, setSearchedPlaylists, setLoading }: Props) {
    const [{ musicPlayerType }] = useRoomStateProvider();
    const isInitialMount = useRef(true);

    const searchPlaylists = useSearchPlaylists({ setSearchedPlaylists, setLoading });

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        searchPlaylists(searchedQuery);
    }, [searchedQuery, musicPlayerType, searchPlaylists]);

    return (
        <SearchInput
            type="text"
            placeholder="Type a playlist name..."
            value={searchedQuery}
            onChange={(e) => setSearchedQuery(e.target.value)}
        />
    )
}

const SearchInput = styled.input`
  width: 94%;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  background: var(--secondary-spotify-bg-color);
  color: var(--primary-spotify-text-color);

  &::placeholder {
    color: var(--secondary-spotify-text-color);
  }

  &:focus {
    outline: 1px solid var(--button-spotify-bg-color);
  }
`;