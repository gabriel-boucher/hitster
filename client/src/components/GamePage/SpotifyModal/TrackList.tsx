import { PlaylistInterface } from "@shared/interfaces";
import styled from "styled-components";

interface Props {
    openedPlaylist: PlaylistInterface | null;
    closeTrackList: () => void;
    closeModal: () => void;
}

export const TrackList = ({ openedPlaylist, closeTrackList, closeModal }: Props) => {
  if (!openedPlaylist) return null;

  return (
    <>
      <Header>
        <BackButton onClick={closeTrackList}>&larr;</BackButton>
        <Title>
          {openedPlaylist.name} - {openedPlaylist.tracks.total}
        </Title>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
      </Header>
      <List>
        {openedPlaylist.tracks.items
          .filter((item) => item.track.id)
          .map((item) => (
              <Item key={item.track.id}>
              <Image
                src={item.track.album.images[0].url}
                alt={item.track.name}
                />
              <div>
                <p>{item.track.album.release_date}</p>
                {item.track.name} - {item.track.artists[0].name}
              </div>
            </Item>
          ))}
        {!openedPlaylist && <p>Searching...</p>}
      </List>
    </>
  );
};

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

const HeaderButton = styled.div`
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: #1db954;
  }
`;

const BackButton = styled(HeaderButton)``;

const CloseButton = styled(HeaderButton)``;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  height: 300px;
  max-height: 300px;
  overflow-y: auto;
`;

const Item = styled.li`
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

const Image = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 4px;
`;
