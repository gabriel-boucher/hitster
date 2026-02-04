import styled from "styled-components";
import CardInDeck from "../../elements/Card/CardInDeck";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";

interface CardProps {
  hoveredPlayerId: string;
  isClickedPlayer: boolean;
}

export default function PlayerCards({ hoveredPlayerId, isClickedPlayer }: CardProps) {
  const [{ players }] = useRoomStateProvider();

  return (
    <PlayerCardsContainer>
      {
        players.find((player) => player.id === hoveredPlayerId)?.deck.cards.map((card) =>(
          <CardInDeck key={card.id} card={card} isClickedPlayer={isClickedPlayer}/>
        ))
      }
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
