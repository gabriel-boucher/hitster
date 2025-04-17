import styled from "styled-components";
import { TokenInterface } from "@shared/Interfaces";
import { useMemo } from "react";
import { useStateProvider } from "../../../utils/StateProvider";

interface TokenProps {
  token: TokenInterface;
  isDragging: boolean;
  handleMouseClick: (token: TokenInterface) => void;
  handleMouseDraggingOver: (
    e: React.MouseEvent<HTMLDivElement>,
    token: TokenInterface
  ) => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement>,
    token: TokenInterface
  ) => void;
}

export default function ActiveToken({
  token,
  isDragging,
  handleMouseClick,
  handleMouseDraggingOver,
  handleMouseOver,
}: TokenProps) {
  const [{ players }] = useStateProvider();

  const handleMouseEvents = useMemo(
    () => ({
      onClick: () => handleMouseClick(token),
      onMouseOver: (e: React.MouseEvent<HTMLDivElement>) =>
        isDragging
          ? handleMouseDraggingOver(e, token)
          : handleMouseOver(e, token),
    }),
    [token, isDragging, handleMouseDraggingOver, handleMouseOver, handleMouseClick]
  );

  const style = {
    opacity: token.active ? 1 : 0.3,
    border: token.active ? "none" : "2px solid white",
  };

  return (
    <Token {...handleMouseEvents}>
      <div className="token-container" style={style}>
        <div className="details">
          <div className="player-name">
            {players.find((player) => player.socketId === token.playerId)?.name}
          </div>
        </div>
      </div>
    </Token>
  );
}

const Token = styled.div`
  aspect-ratio: 1/1;
  height: 100%;
  width: auto;

  flex-shrink: 1;
  min-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  user-select: none;

  &:first-child::before,
  &:last-child::after {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 100vw;
    user-select: none;
  }

  &::before {
    right: 99%;
  }

  &::after {
    left: 99%;
  }

  .token-container {
    aspect-ratio: 1/1;
    width: 80%;

    display: flex;
    justify-content: center;
    align-content: center;

    position: relative;

    border-radius: 50%;

    background-image: url("src/assets/hitster_logo_square.webp");
    background-repeat: no-repeat;
    background-size: cover;

    cursor: pointer;
  }

  .details {
    width: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;

    flex-shrink: 1;
    min-width: 0;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 5%;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;

    background-color: hsla(0, 0%, 100%, 90%);
    padding: 0px 4px 4px 4px;

    user-select: none;

    .player-name {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }
  }
`;
