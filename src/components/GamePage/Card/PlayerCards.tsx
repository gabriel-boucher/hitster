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
  const [{ players, cards }] = useStateProvider();
  const playerCardsRef = useRef<HTMLDivElement | null>(null);

  return (
    <PlayerCardsContainer ref={playerCardsRef} onMouseLeave={handleMouseLeave}>
      {cards
        .filter((card) => card.playerId === players[0].socketId)
        .map((card) => (
          <CardInDeck
            key={card.id}
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
  max-width: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-left: 1%;
  padding-right: 1%;
`;
