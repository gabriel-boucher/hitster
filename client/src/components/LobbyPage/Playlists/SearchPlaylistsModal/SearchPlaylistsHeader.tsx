import XMark from "../../../icons/XMark.tsx";
import styled from "styled-components";

interface Props {
    closeModal: () => void;
}

export default function SearchPlaylistsHeader({ closeModal }: Props) {
    return (
        <Header>
            <Title>Search Playlists</Title>
            <CloseButton onClick={closeModal}>
                <XMark />
            </CloseButton>
        </Header>
    )
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-spotify-text-color);
  cursor: pointer;
  height: 1.5rem;
`;