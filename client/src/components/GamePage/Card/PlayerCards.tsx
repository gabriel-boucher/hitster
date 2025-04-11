import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInDeck from "./CardInDeck";
import { isCard } from "../../../utils/Items";

interface CardProps {
  isDragging: boolean;
}

export default function PlayerCards({
  isDragging,
}: CardProps) {
  const [{ socket, items }] = useStateProvider();

  return (
    <PlayerCardsContainer>
      {items
        .filter((item) => isCard(item))
        .filter((card) => card.playerId === socket.id)
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
  max-width: 95%;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-left: 1%;
  padding-right: 1%;
`;
