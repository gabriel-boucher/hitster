import { WHITE_COLOR__HEX } from "src/utils/Constants";
import styled from "styled-components";

export default function Pause() {
  return (
    <PauseIcon
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(0 0 0)"
    >
      <path
        d="M7 3.25C5.75736 3.25 4.75 4.25736 4.75 5.5V18.4999C4.75 19.7426 5.75736 20.75 7 20.75H8.75C9.99264 20.75 11 19.7426 11 18.4999V5.5C11 4.25736 9.99264 3.25 8.75 3.25H7Z"
      />
      <path
        d="M16.25 3.25C15.0074 3.25 14 4.25736 14 5.5V18.4999C14 19.7426 15.0074 20.75 16.25 20.75H18C19.2426 20.75 20.25 19.7426 20.25 18.4999V5.5C20.25 4.25736 19.2426 3.25 18 3.25H16.25Z"
      />
    </PauseIcon>
  );
}

const PauseIcon = styled.svg`
  width: 50px;
  height: 50px;

  path {
    fill: ${WHITE_COLOR__HEX};
  }
`