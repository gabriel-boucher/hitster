import { PlaylistInterface } from "@shared/interfaces";
import { useState, useEffect } from "react";
import searchPlaylists from "src/api/searchPlaylists";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchPlaylistModal = ({ isOpen, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [playlists, setPlaylists] = useState<PlaylistInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const [{ roomId }] = useStateProvider();

  useEffect(() => {
    if (!query.trim()) {
      setLoading(false);
      setPlaylists([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      const playlistsResponse = await searchPlaylists(roomId, query);
      setPlaylists(playlistsResponse);
      setLoading(false);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [roomId, query]);

  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <Header>
          <Title>Search Spotify Playlists</Title>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </Header>
        <SearchInput
          type="text"
          placeholder="Type a playlist name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <PlaylistList>
          {loading && <p>Searching...</p>}
          {playlists.map((playlist) => (
            <PlaylistItem key={playlist.id}>
              <PlaylistImage src={playlist.images[0].url} alt={playlist.name} />
              {playlist.name}
            </PlaylistItem>
          ))}
        </PlaylistList>
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
  max-width: 90%;
  color: white;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #1db954;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const PlaylistList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
`;

const PlaylistItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0;
  cursor: pointer;
  border-bottom: 1px solid #333;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const PlaylistImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
`;
