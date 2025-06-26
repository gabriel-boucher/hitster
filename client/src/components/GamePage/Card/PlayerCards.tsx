import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInDeck from "./CardInDeck";
import { isCard } from "@shared/utils";
import { CardInterface } from "@shared/Interfaces";

interface CardProps {
  hoveredPlayerId: string;
  isClickedPlayer: boolean;
}

export default function PlayerCards({ hoveredPlayerId, isClickedPlayer }: CardProps) {
  const [{ items }] = useStateProvider();

  return (
    <PlayerCardsContainer>
      {items
        .filter(
          (item): item is CardInterface =>
            isCard(item) && item.playerId === hoveredPlayerId
        )
        .map((card) => (
          <CardInDeck key={card.id} card={card} isClickedPlayer={isClickedPlayer}/>
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
