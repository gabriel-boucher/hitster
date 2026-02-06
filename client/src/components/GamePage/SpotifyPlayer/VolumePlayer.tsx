import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Slider from "src/components/elements/Slider";
import Volume0 from "src/components/icons/Volume0";
import Volume3 from "src/components/icons/Volume3";
import Volume2 from "src/components/icons/Volume2";
import Volume1 from "src/components/icons/Volume1";
import useSetPlayerVolume from "../../../hooks/spotify/useSetPlayerVolume.ts";
import {useSpotifyStateProvider} from "../../../stateProvider/spotify/SpotifyStateProvider.tsx";

export default function VolumePlayer() {
  const [{ volume }] = useSpotifyStateProvider();
  const [savedVolume, setSavedVolume] = useState(volume);

  const setPlayerVolume = useSetPlayerVolume();

  const handleVolumeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayerVolume(parseInt(e.target.value) / 100);
  };

  const handleVolumeMute = () => {
    if (volume == 0) {
      setPlayerVolume(savedVolume);
    } else {
      setSavedVolume(volume);
      setPlayerVolume(0);
    }
  };

  const VolumeIcon = () => {
    if (volume === 0) return <Volume0 />;
    else if (volume <= 0.33) return <Volume1 />;
    else if (volume <= 0.66) return <Volume2 />;
    else return <Volume3 />;
  };

  return (
    <PlayerContainer>
      <Player $sliderProgress={volume * 100}>
        <VolumeSlider
          sliderProgress={volume * 100}
          handleSliderProgress={handleVolumeProgress}
          vertical={true}
        />
        <Volume onClick={handleVolumeMute}>
          {VolumeIcon()}
        </Volume>
      </Player>
    </PlayerContainer>
  );
}


const VolumeSlider = styled(Slider)`
`;

const Volume = styled.div`
  display: flex;
  margin-bottom: -2px;
`

const Player = styled.div<{ $sliderProgress: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  input[type="range"] {
    height: 0;
    transition: height 0.2s ease;
  }

  &:hover input[type="range"] {
    writing-mode: sideways-lr;
    height: 10vh;

    &::-webkit-slider-thumb {
      opacity: 1;
    }

    &::-moz-range-thumb {
      opacity: 1;
    }
  }

  // Hover on volume icon to edit volume slider (prevents using a state variable)
  /* &:has(svg:hover) input[type="range"] {
    background: ${({ $sliderProgress }) =>
      `linear-gradient(to top, var(--primary-bg-color) ${$sliderProgress}%, hsla(0, 0%, 100%, 20%) ${$sliderProgress}%)`};
  } */
  &:hover input[type="range"] {
    background: ${({ $sliderProgress }) =>
      `linear-gradient(to top, var(--primary-bg-color) ${$sliderProgress}%, hsla(0, 0%, 100%, 20%) ${$sliderProgress}%)`};
  }
`;



const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 20vh;
  width: 4vw;
`;