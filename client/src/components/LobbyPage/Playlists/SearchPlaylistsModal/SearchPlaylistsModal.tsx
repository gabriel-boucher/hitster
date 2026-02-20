import styled from "styled-components";
import { PlaylistList } from "./PlaylistList.tsx";
import SearchPlaylistsHeader from "./SearchPlaylistsHeader.tsx";
import {Dispatch, SetStateAction, useState} from "react";
import {Playlist} from "../../../../type/music/Playlist.ts";
import SearchPlaylistsInput from "./SearchPlaylistsInput.tsx";
import SearchPlaylistsAuth from "./SearchPlaylistsAuth.tsx";

interface Props {
  searchedQuery: string;
  setSearchedQuery: Dispatch<SetStateAction<string>>;
  searchedPlaylists: Playlist[];
  setSearchedPlaylists: Dispatch<SetStateAction<Playlist[]>>;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const SearchPlaylistsModal = ({ searchedQuery, setSearchedQuery, searchedPlaylists, setSearchedPlaylists, isModalOpen, closeModal }: Props) => {
  const [loading, setLoading] = useState(false);

  if (!isModalOpen) return null;

  return (
    <Overlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
          <SearchPlaylistsHeader closeModal={closeModal} />
          <SearchPlaylistsInput searchedQuery={searchedQuery} setSearchedQuery={setSearchedQuery} setSearchedPlaylists={setSearchedPlaylists} setLoading={setLoading} />
          <PlaylistList searchedPlaylists={searchedPlaylists} loading={loading} />
          <SearchPlaylistsAuth />
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--primary-spotify-bg-color);
  border-radius: 12px;
  padding: 1.5rem;
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  z-index: 2;
  color: var(--primary-spotify-text-color);
`;

