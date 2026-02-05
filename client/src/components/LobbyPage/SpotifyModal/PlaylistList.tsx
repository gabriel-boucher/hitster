import XMark from "../../icons/XMark.tsx";
import styled, { keyframes } from "styled-components";
import useSearchPlaylists from "../../../hooks/http/spotify/useSearchPlaylists.ts";
import useRemovePlaylist from "../../../hooks/socket/room/useRemovePlaylist.ts";
import useAddPlaylist from "../../../hooks/socket/room/useAddPlaylist.ts";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";

interface Props {
  closeModal: () => void;
}

export const PlaylistList = ({ closeModal }: Props) => {
  const [{ playlists }] = useRoomStateProvider();
  const { searchedPlaylists, loading, query, setQuery } = useSearchPlaylists();
  const addPlaylist = useAddPlaylist();
  const removePlaylist = useRemovePlaylist();

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
        {searchedPlaylists.map((playlist) => {
          const isSelected = playlists.some(
            (p) => p.id === playlist.id
          );
          return (
            <Item key={playlist.id}>
              <Image src={playlist.imageUrl} alt={playlist.name} />
              <Info>
                <Name>{playlist.name}</Name>
                <TrackNumber>{playlist.totalTracks} tracks</TrackNumber>
              </Info>

              {isSelected ? (
                <RemoveButton
                  onClick={() => {
                    removePlaylist(playlist.id);
                  }}
                >
                  <Minus />
                </RemoveButton>
              ) : (
                <AddButton
                  onClick={() => {
                    addPlaylist(playlist);
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
  color: var(--primary-spotify-text-color);
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
  background: var(--secondary-spotify-bg-color);
  color: var(--primary-spotify-text-color);

  &::placeholder {
    color: var(--secondary-spotify-text-color);
  }

  &:focus {
    outline: 1px solid var(--button-spotify-bg-color);
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
    width: 0;
  }
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem;
  border-bottom: 1px solid var(--secondary-spotify-bg-color);

  &:hover {
    background: var(--hover-spotify-bg-color);
    border-radius: 8px;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
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
  color: var(--secondary-spotify-text-color);
`;

const ActionButton = styled.button`
  border: none;
  border-radius: 50%;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--primary-spotify-text-color);

  &:hover {
    opacity: 0.9;
  }
`;

const AddButton = styled(ActionButton)`
  background: var(--button-spotify-bg-color);
`;

const RemoveButton = styled(ActionButton)`
  background: #e74c3c;
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
