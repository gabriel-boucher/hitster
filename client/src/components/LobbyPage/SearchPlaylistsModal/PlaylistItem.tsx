import RemovePlaylistButton from "../icons/RemovePlaylistButton.tsx";
import AddPlaylistButton from "../icons/AddPlaylistButton.tsx";
import styled from "styled-components";
import {Playlist} from "../../../type/music/Playlist.ts";

interface Props {
    playlist: Playlist;
    isSelected: boolean;
    addPlaylist: (playlist: Playlist) => Promise<void>;
    removePlaylist: (playlistId: string) => Promise<void>;
}

export default function PlaylistItem({ playlist, isSelected, addPlaylist, removePlaylist }: Props) {
    return (
        <Item>
            <Image src={playlist.imageUrl} alt={playlist.name} />
            <Info>
                <Name>{playlist.name}</Name>
                <TrackNumber>{playlist.totalTracks} tracks</TrackNumber>
            </Info>

            {isSelected ? (
                <RemovePlaylistButton
                    onClick={async () => {
                        await removePlaylist(playlist.id);
                    }}
                />
            ) : (
                <AddPlaylistButton
                    onClick={async () => {
                        await addPlaylist(playlist);
                    }}
                />
            )}
        </Item>
    );
}

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