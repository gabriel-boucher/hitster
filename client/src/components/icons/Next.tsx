import { WHITE_COLOR__HEX } from "src/utils/Constants";
import styled from "styled-components";

export default function Next() {
  return (
    <NextIcon
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(90 0 0)"
    >
      <path
        d="M19.1085 14.9053C18.8156 15.1982 18.3407 15.1982 18.0478 14.9053L12.3281 9.18566L6.60845 14.9053C6.31556 15.1982 5.84069 15.1982 5.5478 14.9053C5.2549 14.6124 5.2549 14.1376 5.5478 13.8447L11.7978 7.59467C12.0907 7.30178 12.5656 7.30178 12.8585 7.59467L19.1085 13.8447C19.4013 14.1376 19.4013 14.6124 19.1085 14.9053Z"
      />
    </NextIcon>
  );
}

const NextIcon = styled.svg`
  width: 50px;
  height: 50px;

  path {
    fill: ${WHITE_COLOR__HEX};
  }
`