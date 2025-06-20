import styled from "styled-components";
import SongPlayer from "./SongPlayer";
import VolumePlayer from "./VolumePlayer";

export default function SpotifyPlayer() {


  return (
    <MiniPlayer>
      <SongPlayer />
      <VolumePlayer />
    </MiniPlayer>
  );
}

const MiniPlayer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

