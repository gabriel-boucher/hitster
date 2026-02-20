import styled, {keyframes} from "styled-components";
import useRemovePlaylist from "../../../../hooks/http/music/useRemovePlaylist.ts";
import useAddPlaylist from "../../../../hooks/http/music/useAddPlaylist.ts";
import {useRoomStateProvider} from "../../../../stateProvider/room/RoomStateProvider.tsx";
import {Playlist} from "../../../../type/music/Playlist.ts";
import PlaylistItem from "./PlaylistItem.tsx";

interface Props {
    searchedPlaylists: Playlist[];
    loading: boolean;
}

export const PlaylistList = ({ searchedPlaylists, loading}: Props) => {
  const [{ playlists }] = useRoomStateProvider();

  const addPlaylist = useAddPlaylist();
  const removePlaylist = useRemovePlaylist();

  return (
      <List>
        {loading && <LoadingSpinner />}

        {!loading && searchedPlaylists.length === 0 && (
          <NoPlaylistMessage>No playlist found</NoPlaylistMessage>
        )}

        {!loading && searchedPlaylists.map((playlist) => {
          const isSelected = playlists.some(
            (p) => p.id === playlist.id
          );
          return (
            <PlaylistItem key={playlist.id} playlist={playlist} isSelected={isSelected} addPlaylist={addPlaylist} removePlaylist={removePlaylist} />
          );
        })}
      </List>
  );
};

const List = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
  height: 320px;  
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

/* Spinner */
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 3px solid var(--secondary-spotify-text-color);
  border-top: 3px solid var(--button-spotify-bg-color);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  animation: ${spin} 1s linear infinite;
  margin: auto;
`;

const NoPlaylistMessage = styled.p`
  text-align: center;
  color: var(--secondary-spotify-text-color);
  margin: auto;
`;


