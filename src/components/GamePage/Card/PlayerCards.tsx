import styled from "styled-components";
import { useRef } from "react";
import { reducerCases } from "../../../utils/Constants";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInDeck from "./CardInDeck";

interface CardProps {
  isDragging: boolean;
  handleDeckGapDetection: (
    e: React.MouseEvent<HTMLDivElement>,
    cardIndex: number
  ) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: reducerCases.SET_PLAYERS | reducerCases.SET_CARDS,
  ) => void;
}

export default function PlayerCards({
  isDragging,
  handleDeckGapDetection,
  handleMouseDown,
}: CardProps) {
  const [{players, activePlayer, gapIndex}] = useStateProvider();
  const playerCardsRef = useRef<HTMLDivElement | null>(null);

  return (
      <PlayerCardsContainer ref={playerCardsRef}>
        {players[activePlayer].cards.map((card, index) => (
          <CardInDeck
            key={card.id}
            index={index}
            playerCardsRef={playerCardsRef}
            card={card}
            isGapBefore={gapIndex === index}
            isGapAfter={gapIndex === index + 1}
            isDragging={isDragging}
            handleDeckGapDetection={handleDeckGapDetection}
            handleMouseDown={handleMouseDown}
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
