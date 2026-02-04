import styled from "styled-components";
import {Card} from "../../../type/item/Card.ts";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";

interface CardProps {
  card: Card;
  isClickedPlayer: boolean;
}

export default function CardInDeck({ card, isClickedPlayer }: CardProps) {
  const [{ currentCardId, isDragging }] = useGameStateProvider();

  const cardStyle = {
    backgroundImage:
          card.id === currentCardId
              ? `url("src/assets/hitster_logo_square.webp")`
              : `url(${card.albumUrl})`
  };

  return (
    <Container $isDragging={isDragging}>
      <CardComponent style={{...cardStyle}}>
        {card.id !== currentCardId && (
          <Details $isClickedPlayer={isClickedPlayer}>
            <div className="date">{card.date}</div>
            <div className="song">{card.song}</div>
            <div className="artist">{card.artist}</div>
          </Details>
        )}
      </CardComponent>
    </Container>
  );
}

const Details = styled.div<{
  $isClickedPlayer: boolean;
}>`
  width: ${({ $isClickedPlayer }) => ($isClickedPlayer ? "80%" : "70%")};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${({ $isClickedPlayer }) => ($isClickedPlayer ? "flex-start" : "center")};
  flex-wrap: nowrap;

  flex-shrink: 1;
  min-width: 0;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: hsla(0, 0%, 100%, 90%);
  border-radius: inherit;
  padding: 0px 4px 4px 4px;

  user-select: none;

  .date {
      display: ${({ $isClickedPlayer }) => ($isClickedPlayer ? "none" : "block")};
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }

    .song,
    .artist {
      display: ${({ $isClickedPlayer }) => ($isClickedPlayer ? "block" : "none")};
      font-size: 12px;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      width: 100%;
    }

    .song {
      font-weight: bold;
    }
`

const CardComponent = styled.div`
  aspect-ratio: 1/1;
  width: 80%;

  display: flex;
  justify-content: center;
  align-content: center;

  position: relative;

  border-radius: 5%;

  background-repeat: no-repeat;
  background-size: cover;

  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  transition: width 0.3s ease;
  cursor: pointer;
`

const Container = styled.div<{
  $isDragging: boolean;
}>`
  height: 100%;
  min-width: 0;
  aspect-ratio: 1/1;

  flex-shrink: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  &:hover {
    ${({$isDragging}) => !$isDragging && `
      ${CardComponent} {
        width: 89%;
      }

      ${Details} {
        width: 80%;
      }

      .date {
        display: none;
      }

      .song,
      .artist {
        display: block;
      }
    `}
  }
`;