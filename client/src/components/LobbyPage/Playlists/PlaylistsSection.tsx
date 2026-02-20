import styled from "styled-components";
import { useState } from "react";
import { SearchPlaylistsModal } from "./SearchPlaylistsModal/SearchPlaylistsModal.tsx";
import useRemovePlaylist from "../../../hooks/http/music/useRemovePlaylist.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { useRoomStateProvider } from "../../../stateProvider/room/RoomStateProvider.tsx";
import { Playlist } from "../../../type/music/Playlist.ts";
import Section from "../components/Section.tsx";
import RemoveButton from "../elements/RemoveButton.tsx";
import {SectionListItem} from "../components/SectionListItem.tsx";
import {SectionListContainer} from "../components/SectionListContainer.tsx";
import SecondaryButton from "../elements/SecondaryButton.tsx";

export default function PlaylistsSection() {
  const [{ playerId }] = useConnectionStateProvider();
  const [{ players, playlists }] = useRoomStateProvider();
  const [searchedQuery, setSearchedQuery] = useState("");
  const [searchedPlaylists, setSearchedPlaylists] = useState<Playlist[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removePlaylist = useRemovePlaylist();

  const isHost = players.length > 0 && players[0].id === playerId;

  return (
    <Section title={"Playlists"}>
      <SectionListContainer>
        {playlists.length === 0 && (
            <EmptyMessage>No playlists added yet</EmptyMessage>
        )}
        {playlists?.map((playlist) => (
          <SectionListItem key={playlist.id}>
            <PlaylistImage $imageUrl={playlist.imageUrl} />
            <PlaylistInfo>
              <PlaylistName>{playlist.name}</PlaylistName>
              <PlaylistTotalTracks>{playlist.totalTracks} tracks</PlaylistTotalTracks>
            </PlaylistInfo>
            {isHost && <RemoveButton onClick={() => removePlaylist(playlist.id)} />}
          </SectionListItem>
        ))}
      </SectionListContainer>
      <SecondaryButton onClick={() => setIsModalOpen(true)}>
        Choose Playlist
      </SecondaryButton>

      <SearchPlaylistsModal
        searchedQuery={searchedQuery}
        setSearchedQuery={setSearchedQuery}
        searchedPlaylists={searchedPlaylists}
        setSearchedPlaylists={setSearchedPlaylists}
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      />
    </Section>
  );
}

const PlaylistImage = styled.div<{ $imageUrl: string }>`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-position: center;
`;

const PlaylistInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PlaylistName = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;

const PlaylistTotalTracks = styled.span`
    font-size: 0.8rem;
    color: var(--secondary-spotify-text-color);
`;

const EmptyMessage = styled.p`
  text-align: center;
  margin: auto;
  color: var(--lobby-white-50);
`;
