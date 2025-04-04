import styled from "styled-components";
import { useRef } from "react";
import { useStateProvider } from "../../../utils/StateProvider";
import ActiveCard from "./ActiveCard";
import { CardInterface } from "../../../utils/Interfaces";

interface CardProps {
  isDragging: boolean;
  setDragPosition: (position: { x: number; y: number }) => void;
  setActiveCardWidth: (width: number) => void;
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

export default function ActivePlayerCards({
  isDragging,
  setDragPosition,
  setActiveCardWidth,
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
        .map((card, index) =>
          index === 0 ? (
            <ActiveCard
              key={card.id}
              card={card}
              isDragging={isDragging}
              setDragPosition={setDragPosition}
              setActiveCardWidth={setActiveCardWidth}
              handleMouseDown={handleMouseDown}
              handleMouseOver={handleMouseOver}
            />
          ) : (
            <ActiveCard
              key={card.id}
              card={card}
              isDragging={isDragging}
              setDragPosition={setDragPosition}
              setActiveCardWidth={setActiveCardWidth}
              handleMouseDown={handleMouseDown}
              handleMouseOver={handleMouseOver}
            />
          )
        )}
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
  background-color: #07245a;
  padding-left: 1%;
  padding-right: 1%;
`;
