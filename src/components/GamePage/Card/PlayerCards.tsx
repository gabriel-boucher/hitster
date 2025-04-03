import styled from "styled-components";
import { useRef } from "react";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInDeck from "./CardInDeck";
import { CardInterface } from "../../../utils/Interfaces";

interface CardProps {
  isDragging: boolean;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
}

export default function PlayerCards({
  isDragging,
  handleMouseDown,
  handleMouseOver,
  handleMouseLeave,
}: CardProps) {
  const [{ activePlayer, cards }] = useStateProvider();
  const playerCardsRef = useRef<HTMLDivElement | null>(null);

  return (
    <PlayerCardsContainer ref={playerCardsRef} onMouseLeave={handleMouseLeave}>
      {cards
        .filter((card) => card.playerId === activePlayer.socketId)
        .map((card) => (
          <CardInDeck
            key={card.id}
            playerCardsRef={playerCardsRef}
            card={card}
            isDragging={isDragging}
            handleMouseDown={handleMouseDown}
            handleMouseOver={handleMouseOver}
          />
        ))}
    </PlayerCardsContainer>
  );
}

const PlayerCardsContainer = styled.div`
  height: 20vh;
  max-width: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #0a1d36;
  padding-left: 1%;
  padding-right: 1%;
`;
