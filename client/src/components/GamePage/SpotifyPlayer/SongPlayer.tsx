import { ChangeEvent } from "react";
import Button from "src/components/elements/Button";
import Slider from "src/components/elements/Slider";
import Pause from "src/components/icons/Pause";
import Play from "src/components/icons/Play";
import styled from "styled-components";
import { formatTime, secondsToMs, msToSeconds } from "src/utils/timeFormatter";
import useTogglePlayerPlay from "../../../hooks/spotify/useTogglePlayerPlay.ts";
import useSetPlayerTimePosition from "../../../hooks/spotify/useSetPlayerTimePosition.ts";
import {usePlaybackStateProvider} from "../../../stateProvider/spotify/SpotifyStateProvider.tsx";

export default function SongPlayer() {
    const [{ isPlaying, timePosition, duration }] = usePlaybackStateProvider();

  const togglePlayerPlay = useTogglePlayerPlay();
  const setPlayerTimePosition = useSetPlayerTimePosition();

  const handlePlayerTime = (e: ChangeEvent<HTMLInputElement>) => {
    const seconds = parseInt(e.target.value, 10);
    setPlayerTimePosition(secondsToMs(seconds));
  };

  const iconComponent = isPlaying ? Pause() : Play();

  const currentPositionInSeconds = msToSeconds(timePosition);
  const durationInSeconds = msToSeconds(duration);

  return (
    <Player>
      <Button 
        iconComponent={iconComponent} 
        handleClick={togglePlayerPlay}
      />
      <Playback>
        <span className="time left">
          {formatTime(timePosition)}
        </span>
        <Slider
          sliderProgress={currentPositionInSeconds}
          handleSliderProgress={handlePlayerTime}
          max={durationInSeconds}
        />
        <span className="time right">
          {formatTime(duration)}
        </span>
      </Playback>
    </Player>
  );
}

const Playback = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: var(--primary-text-color);
  margin-bottom: 4px;
  -webkit-user-select: none; /* Safari */
  user-select: none; /* Standard syntax */

  .time {
    width: 2.5rem;
  }

  .left {
    text-align: right;
  }

  .right {
    text-align: left;
  }
`;

const Player = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  height: 20vh;
`;

