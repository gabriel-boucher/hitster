import styled from "styled-components";
import { PlaylistList } from "./PlaylistList.tsx";

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
}

export const SpotifyModal = ({ isModalOpen, closeModal }: Props) => {

  if (!isModalOpen) return null;

  return (
    <Overlay onClick={closeModal}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
          <PlaylistList closeModal={closeModal} />
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
  background: var(--primary-spotify-bg-color);
  border-radius: 12px;
  padding: 1.5rem;
  width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  z-index: 2;
  color: var(--primary-spotify-text-color);
`;
