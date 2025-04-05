import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInDeck from "./CardInDeck";

interface CardProps {
  isDragging: boolean;
}

export default function PlayerCards({
  isDragging,
}: CardProps) {
  const [{ players, cards }] = useStateProvider();

  return (
    <PlayerCardsContainer>
      {cards
        .filter((card) => card.playerId === players[0].socketId)
        .map((card) => (
          <CardInDeck
            key={card.id}
            card={card}
            isDragging={isDragging}
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
