import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInDeck from "./CardInDeck";
import { isCard } from "@shared/utils";
import { CardInterface } from "@shared/Interfaces";

interface CardProps {
  clickedPlayerId: string;
}

export default function PlayerCards({ clickedPlayerId }: CardProps) {
  const [{ items, isDragging }] = useStateProvider();

  return (
    <PlayerCardsContainer>
      {items
        .filter(
          (item): item is CardInterface =>
            isCard(item) && item.playerId === clickedPlayerId
        )
        .map((card) => (
          <CardInDeck key={card.id} card={card} isDragging={isDragging} />
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
