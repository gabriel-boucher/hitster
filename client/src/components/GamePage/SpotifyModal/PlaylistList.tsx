import { PlaylistInterface } from "@shared/interfaces";
import { useState, useEffect } from "react";
import searchPlaylists from "src/api/searchPlaylists";
import XMark from "src/components/icons/XMark";
import { useDebounce } from "src/hooks/useDebounce";
import { useStateProvider } from "src/utils/StateProvider";
import styled, { keyframes } from "styled-components";

interface Props {
  selectedPlaylists: PlaylistInterface[];
  addSelectedPlaylist: (playlist: PlaylistInterface) => void;
  removeSelectedPlaylist: (playlistId: string) => void;
  closeModal: () => void;
}

export const PlaylistList = ({
  selectedPlaylists,
  addSelectedPlaylist,
  removeSelectedPlaylist,
  closeModal,
}: Props) => {
  const [query, setQuery] = useState("");
  const [playlists, setPlaylists] = useState<PlaylistInterface[]>([]);
  const [loading, setLoading] = useState(false);

  const [{ roomId }] = useStateProvider();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setLoading(false);
      setPlaylists([]);
      return;
    }

    const fetchPlaylists = async () => {
      setLoading(true);
      const playlistsResponse = await searchPlaylists(roomId, debouncedQuery);
      setPlaylists(playlistsResponse);
      setLoading(false);
    };

    fetchPlaylists();
  }, [roomId, debouncedQuery]);

  return (
    <Container>
      <Header>
        <Title>Search Spotify Playlists</Title>
        <CloseButton onClick={closeModal}>
          <XMark />
        </CloseButton>
      </Header>

      <SearchInput
        type="text"
        placeholder="Type a playlist name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <List>
        {loading && <LoadingSpinner />}
        {playlists.map((playlist) => {
          const isSelected = selectedPlaylists.some(
            (p) => p.id === playlist.id
          );
          return (
            <Item key={playlist.id}>
              <Image src={playlist.images[0]?.url} alt={playlist.name} />
              <Info>
                <Name>{playlist.name}</Name>
                <TrackNumber>{playlist.tracks.total} tracks</TrackNumber>
              </Info>

              {isSelected ? (
                <RemoveButton
                  onClick={() => {
                    removeSelectedPlaylist(playlist.id);
                  }}
                >
                  <Minus />
                </RemoveButton>
              ) : (
                <AddButton
                  onClick={() => {
                    addSelectedPlaylist(playlist);
                  }}
                >
                  <Plus />
                </AddButton>
              )}
            </Item>
          );
        })}
      </List>
    </Container>
  );
};

/* ---------- Styled ---------- */

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background: #181818;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  color: white;
  max-width: 500px; */
`;

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
  color: #aaa;
  cursor: pointer;
  height: 1.5rem;
`;

const SearchInput = styled.input`
  width: 94%;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  border: none;
  outline: none;
  font-size: 0.95rem;
  margin-bottom: 1rem;
  background: #2a2a2a;
  color: white;

  &::placeholder {
    color: #888;
  }

  &:focus {
    outline: 1px solid #1db954;
  }
`;

const List = styled.ul`
  list-style: none;
  width: 100%;
  padding: 0;
  margin: 0;
  max-height: 320px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem;
  border-bottom: 1px solid #333;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
  flex: 1;
  cursor: default;
`;

const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 6px;
  object-fit: cover;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const TrackNumber = styled.span`
  font-size: 0.8rem;
  color: #888;
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 50%;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const AddButton = styled(ActionButton)`
  background: #1db954;
`;

const RemoveButton = styled(ActionButton)`
  background: #e74c3c;
`;

/* Spinner */
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top: 3px solid #1db954;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  animation: ${spin} 1s linear infinite;
  margin: 1rem auto;
`;

/* ---------- Custom Icons ---------- */
const IconBase = styled.div`
  width: 8px;
  height: 8px;
  position: relative;
  display: inline-block;
`;

const Plus = styled(IconBase)`
  &::before,
  &::after {
    content: "";
    position: absolute;
    background: currentColor;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &::before {
    width: 2px;
    height: 100%;
  }

  &::after {
    width: 100%;
    height: 2px;
  }
`;

const Minus = styled(IconBase)`
  &::before {
    content: "";
    position: absolute;
    background: currentColor;
    width: 100%;
    height: 2px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

// const X = styled(IconBase)`
//   height: 15px;
//   width: 15px;

//   &::before,
//   &::after {
//     content: "";
//     position: absolute;
//     width: 100%;
//     height: 2px;
//     top: 50%;
//     left: 50%;
//     background: currentColor;
//   }

//   &::before {
//     transform: translate(-50%, -50%) rotate(45deg);
//   }

//   &::after {
//     transform: translate(-50%, -50%) rotate(-45deg);
//   }
// `;
