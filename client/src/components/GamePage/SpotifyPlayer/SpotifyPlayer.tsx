import { ChangeEvent, useState } from "react";
import styled from "styled-components";

export default function SpotifyPlayer() {
  const [playing, setPlaying] = useState(false);
  const [value, setValue] = useState(50);
  const [hovered, setHovered] = useState(false);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value));
  };

  return (
    <MiniPlayer>
        <PlayButton onClick={handlePlay}>
            <div className="glow">
                <img
                className="play-icon"
                src="./src/assets/play-button.png"
                style={{ display: playing ? "none" : "block" }}
                />
                <img
                className="pause-icon"
                src="./src/assets/pause-button.png"
                style={{ display: playing ? "block" : "none" }}
                />
            </div>
        </PlayButton>
        <Playback>
            <span className="time left">{value}</span>
            <Slider
                value={value}
                hovered={hovered}
                onChange={handleSliderChange}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            />
            <span className="time right">100</span>
        </Playback>
    </MiniPlayer>
  );
}

const PlayButton = styled.button`
  aspect-ratio: 1/1;
  height: 10vh;
  border-radius: 50%;
  border: none;
  padding: 1vh;
  background: hsla(0, 0%, 100%, 20%);

  &:hover {
    cursor: pointer;
  }

  .glow {
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 0.4vh solid white;
    box-shadow: 0 0 0.2rem #fe13a4, 0 0 0.5rem #fe13a4, 0 0 1rem #fe13a4,
      inset 0 0 0.2rem #fe13a4, inset 0 0 0.5rem #fe13a4, inset 0 0 1rem #fe13a4;

    &:hover {
      box-shadow: 0 0 0.4rem #fe13a4, 0 0 0.7rem #fe13a4, 0 0 1.2rem #fe13a4,
        inset 0 0 0.4rem #fe13a4, inset 0 0 0.7rem #fe13a4,
        inset 0 0 1.2rem #fe13a4;
    }
  }

  .play-icon,
  .pause-icon {
    aspect-ratio: 1/1;
    width: 45%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .play-icon {
    margin-left: 0.5vh;
  }

  .pause-icon {
    margin-left: 0px;
  }
`;

const Slider = styled.input.attrs({ type: 'range' })<{ value: number; hovered: boolean}>`
  height: 5px;
  width: 20vw;
  appearance: none;
  background: ${({ value, hovered }) => 
    hovered 
      ? `linear-gradient(to right, #fe13a4 ${value}%, hsla(0, 0%, 100%, 20%) ${value}%)` 
      : `linear-gradient(to right, white ${value}%, hsla(0, 0%, 100%, 20%) ${value}%)`
  };
  border-radius: 5px;
  transition: background 0.1s;
  outline: none;
  cursor: pointer;
  margin-top: 5px;

  /* Webkit */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: white;
    border: none;
    opacity: ${({ hovered }) => (hovered ? 1 : 0)};
    transition: opacity 0.1s;
  }

  /* Firefox */
  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: white;
    border: none;
    opacity: ${({ hovered }) => (hovered ? 1 : 0)};
    transition: opacity 0.1s;
  }
`;

const Playback = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: white;

  .time {
    width: 4rem;
  }

  .left {
    text-align: right;
  }

  .right {
    text-align: left;
  }
`;

const MiniPlayer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 20vh;
`;

