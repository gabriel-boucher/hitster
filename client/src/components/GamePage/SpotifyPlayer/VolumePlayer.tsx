import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import Slider from "src/components/elements/Slider";
import { PINK_COLOR__HEX } from "src/utils/Constants";

const volumeLevels = [0, 1, 2, 3];

export default function VolumePlayer() {
  const [mute, setMute] = useState(false);
  const [savedVolumeProgress, setSavedVolumeProgress] = useState(50);
  const [volumeProgress, setVolumeProgress] = useState(50);

  const handleVolumeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    setVolumeProgress(parseInt(e.target.value));
  };

  const handleVolumeMute = () => {
    if (mute) {
      setVolumeProgress(savedVolumeProgress);
      setMute(false);
    } else {
      setSavedVolumeProgress(volumeProgress);
      setVolumeProgress(0);
      setMute(true);
    }
  };

  let volumeLevel = 0;
  if (volumeProgress === 0) volumeLevel = 0;
  else if (volumeProgress <= 33) volumeLevel = 1;
  else if (volumeProgress <= 66) volumeLevel = 2;
  else volumeLevel = 3;

  return (
    <PlayerContainer>
      {/* Preload icons to avoid flicker */}
      {volumeLevels.map((level) => (
        <div key={level} style={{ display: "none" }}>
          <img src={`./src/assets/volume-${level}-white.png`} alt="" />
          <img src={`./src/assets/volume-${level}-pink.png`} alt="" />
        </div>
      ))}

      <Player $sliderProgress={volumeProgress}>
        <VolumeSlider
          sliderProgress={volumeProgress}
          handleSliderProgress={handleVolumeProgress}
          vertical={true}
        />
        <VolumeIcon $level={volumeLevel} onClick={handleVolumeMute} />
      </Player>
    </PlayerContainer>
  );
}


const VolumeSlider = styled(Slider)`
`;

const VolumeIcon = styled.img<{ $level: number }>`
  width: 24px;
  height: 24px;
  cursor: pointer;
  content: url(${({ $level }) => `./src/assets/volume-${$level}-white.png`});

  &:hover {
    content: url(${({ $level }) => `./src/assets/volume-${$level}-pink.png`});
  }

  &~input[type="range"] {
    opacity: 0;
  }
`;

const Player = styled.div<{ $sliderProgress: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  input[type="range"] {
    height: 0px;
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
  &:has(${VolumeIcon}:hover) input[type="range"] {
    background: ${({ $sliderProgress }) =>
      `linear-gradient(to top, ${PINK_COLOR__HEX} ${$sliderProgress}%, hsla(0, 0%, 100%, 20%) ${$sliderProgress}%)`};
  }
`;



const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  height: 20vh;
  width: 4vw;

  position: absolute;
  right: 34vw;
`;
