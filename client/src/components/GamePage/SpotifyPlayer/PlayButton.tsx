import { useState } from "react";
import styled from "styled-components";

export default function PlayButton() {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    setPlaying(!playing);
  };

  return (
    <Play onClick={handlePlay}>
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
    </Play>
  );
}

const Play = styled.button`
  aspect-ratio: 1/1;
  height: 14%;
  border-radius: 50%;
  border: none;
  padding: 1vh;
  background: hsla(0, 0%, 100%, 20%);
  margin-right: 5%;

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
    width: 55%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .play-icon {
    margin-left: 1vw;
  }

  .pause-icon {
    margin-left: 0px;
  }
`;
