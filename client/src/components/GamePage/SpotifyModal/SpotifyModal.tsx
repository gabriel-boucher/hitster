import { PlaylistInterface } from "@shared/interfaces";
import styled from "styled-components";
import { PlaylistList } from "./PlaylistList";

interface Props {
  selectedPlaylists: PlaylistInterface[]
  isModalOpen: boolean;
  closeModal: () => void;
  addSelectedPlaylist: (playlist: PlaylistInterface) => void
  removeSelectedPlaylist: (playlistId: string) => void
}

export const SpotifyModal = ({ selectedPlaylists, isModalOpen, closeModal, addSelectedPlaylist, removeSelectedPlaylist }: Props) => {

  if (!isModalOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
          <PlaylistList selectedPlaylists={selectedPlaylists} addSelectedPlaylist={addSelectedPlaylist} removeSelectedPlaylist={removeSelectedPlaylist} closeModal={closeModal} />
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
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: #181818;
  border-radius: 12px;
  padding: 1.5rem;
  width: 500px;
  background: #181818;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  color: white;
`;
