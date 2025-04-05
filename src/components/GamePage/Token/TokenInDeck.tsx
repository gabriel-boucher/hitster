import styled from "styled-components";
import { TokenInterface } from "../../../utils/Interfaces";
import { useMemo } from "react";

interface TokenProps {
  token: TokenInterface;
  handleMouseClick: (token: TokenInterface) => void;
  handleMouseOverToken: (
    e: React.MouseEvent<HTMLDivElement>,
    token: TokenInterface
  ) => void;
}

export default function TokenInDeck({
  token,
  handleMouseClick,
  handleMouseOverToken,
}: TokenProps) {
  const handleMouseEvents = useMemo(
    () => ({
      onClick: () => handleMouseClick(token),
      onMouseOver: (e: React.MouseEvent<HTMLDivElement>) => handleMouseOverToken(e, token),
    }),
    [handleMouseClick]
  );

  const style = {
    backgroundImage: `url(src/assets/hitster_logo_square.webp)`,
    opacity: token.active ? 1 : 0.3,
    border: token.active ? "none" : "2px solid white",
  };

  return (
    <Token {...handleMouseEvents}>
      <div className="token-container" style={style}></div>
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

    border-radius: 50%;

    background-repeat: no-repeat;
    background-size: cover;

    cursor: pointer;
  }
`;
