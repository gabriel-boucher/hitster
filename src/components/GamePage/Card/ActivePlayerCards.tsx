import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import ActiveCard from "./ActiveCard";
import { CardInterface } from "../../../utils/Interfaces";

interface CardProps {
  isDragging: boolean;
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
  setActiveCardWidth,
  handleMouseDown,
  handleMouseOver,
  handleMouseLeave,
}: CardProps) {
  const [{ activePlayer, cards }] = useStateProvider();

  return (
    <PlayerCardsContainer onMouseLeave={handleMouseLeave}>
      {cards
        .filter((card) => card.playerId === activePlayer.socketId)
        .map((card, index) =>(
            <ActiveCard
              key={card.id}
              index={index}
              card={card}
              isDragging={isDragging}
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
