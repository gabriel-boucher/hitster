import { WHITE_COLOR__HEX } from "src/utils/Constants";
import styled from "styled-components";

export default function Play() {
  return (
    <PlayIcon
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(0 0 0)"
    >
      <path
        d="M19.4357 13.9174C20.8659 13.0392 20.8659 10.9608 19.4357 10.0826L9.55234 4.01389C8.05317 3.09335 6.125 4.17205 6.125 5.93128L6.125 18.0688C6.125 19.828 8.05317 20.9067 9.55234 19.9861L19.4357 13.9174Z"
      />
    </PlayIcon>
  );
}

const PlayIcon = styled.svg`
  width: 50px;
  height: 50px;
  margin-left: 3px;

  path {
    fill: ${WHITE_COLOR__HEX};
  }
`