import { ChangeEvent } from "react";
import styled from "styled-components";

interface SliderProps {
  sliderProgress: number;
  handleSliderProgress: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  vertical?: boolean;
}

export default function Slider({
  sliderProgress,
  handleSliderProgress,
  min = 0,
  max = 100,
  vertical = false,
}: SliderProps) {
  return (
    <>
      {vertical ? (
        <VerticalSlider
          $sliderProgress={sliderProgress}
          onChange={handleSliderProgress}
          min={min}
          max={max}
        />
      ) : (
        <HorizontalSlider
          $sliderProgress={sliderProgress}
          onChange={handleSliderProgress}
          min={min}
          max={max}
        />
      )}
    </>
  );
}

const SliderComponent = styled.input.attrs<{
  $sliderProgress: number;
  min: number;
  max: number;
}>(({ $sliderProgress, min, max }) => ({
  type: "range",
  value: $sliderProgress,
  min: min,
  max: max,
}))<{
  $sliderProgress: number;
  min: number;
  max: number;
}>`
  appearance: none;
  border-radius: 5px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--primary-text-color);
    border: none;
    opacity: 0;
  }

  &:hover::-webkit-slider-thumb {
    opacity: 1;
  }

  &::-moz-range-thumb {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: var(--primary-text-color);
    border: none;
    opacity: 0;
  }

  &:hover::-moz-range-thumb {
    opacity: 1;
  }
`;

const HorizontalSlider = styled(SliderComponent)`
  writing-mode: horizontal-tb;
  height: 5px;
  width: 20vw;

  background: ${({ $sliderProgress, max }) =>
    `linear-gradient(to right, var(--primary-text-color) ${($sliderProgress / max) * 100}%, hsla(0, 0%, 100%, 20%) ${($sliderProgress / max) * 100}%)`};

  &:hover {
    background: ${({ $sliderProgress, max }) =>
      `linear-gradient(to right, var(--primary-color) ${($sliderProgress / max) * 100}%, hsla(0, 0%, 100%, 20%) ${($sliderProgress / max) * 100}%)`};
  }
`;

const VerticalSlider = styled(SliderComponent)`
  writing-mode: sideways-lr;
  height: inherit;
  width: 5px;
  margin: 0;

  background: ${({ $sliderProgress, max }) =>
    `linear-gradient(to top, var(--primary-text-color) ${($sliderProgress / max) * 100}%, hsla(0, 0%, 100%, 20%) ${($sliderProgress / max) * 100}%)`};

  &:hover {
    background: ${({ $sliderProgress, max }) =>
      `linear-gradient(to top, var(--primary-color) ${($sliderProgress / max) * 100}%, hsla(0, 0%, 100%, 20%) ${($sliderProgress / max) * 100}%)`};
  }
`;
