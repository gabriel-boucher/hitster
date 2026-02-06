import styled from "styled-components";
import SongPlayer from "./SongPlayer";
import VolumePlayer from "./VolumePlayer";
import Sync from "src/components/icons/Sync";
import {useSpotifyPlayer} from "../../../hooks/spotify/useSpotifyPlayer.ts";

export default function SpotifyPlayer() {

  useSpotifyPlayer();

  const handleSync = () => {};

  return (
      <MiniPlayer>
        <Sync handleSync={handleSync} />
        <SongPlayer />
        <VolumePlayer />
      </MiniPlayer>
  );
}

const MiniPlayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: -5vh;
`;

