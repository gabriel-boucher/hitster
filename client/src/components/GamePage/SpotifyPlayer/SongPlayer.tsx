import { ChangeEvent, useState } from "react";
import Button from "src/components/elements/Button";
import Slider from "src/components/elements/Slider";
import Pause from "src/components/icons/Pause";
import Play from "src/components/icons/Play";
import { WHITE_COLOR__HEX } from "src/utils/Constants";
import styled from "styled-components";

export default function SongPlayer() {
  const [playing, setPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(50);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  const handleSongProgress = (e: ChangeEvent<HTMLInputElement>) => {
    setSongProgress(parseInt(e.target.value));
  };

  const iconComponent = playing
    ? Pause()
    : Play();

  return (
    <Player>
        <Button iconComponent={iconComponent} handleClick={handlePlay} />
        <Playback>
            <span className="time left">{songProgress}</span>
            <Slider
                sliderProgress={songProgress}
                handleSliderProgress={handleSongProgress}
                max={180}
            />
            <span className="time right">180</span>
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
  color: ${WHITE_COLOR__HEX};
  margin-bottom: 4px;

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

