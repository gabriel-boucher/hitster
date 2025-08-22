import { PINK_COLOR__HEX, WHITE_COLOR__HEX } from "src/utils/constants";
import styled from "styled-components";

interface SyncProps {
    handleSync: () => void;
}

export default function Sync({ handleSync }: SyncProps) {
  return (
    <SyncIcon
      xmlns="http://www.w3.org/2000/svg"
      className="bi bi-arrow-repeat"
      viewBox="0 0 16 16"
      onClick={handleSync}
    >
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
      <path
        fillRule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
      />
    </SyncIcon>
  );
}

const SyncIcon = styled.svg`
  fill: ${WHITE_COLOR__HEX};
  height: 24px;
  width: 24px;
  width: 4vw;

  &:hover {
    fill: ${PINK_COLOR__HEX};
    cursor: pointer;
  }
`;
