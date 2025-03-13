import styled from "styled-components";
import { CardInterface } from "../../../utils/Interfaces";

interface CardProps {
  index: number;
  card: CardInterface;
  deckCards: CardInterface[];
  isGapBefore: boolean;
  isGapAfter: boolean;
  isDragging: boolean;
  numberOfCards: number;
  handleDeckGapDetection: (
    e: React.MouseEvent<HTMLDivElement>,
    cardIndex: number
  ) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
    cards: CardInterface[],
    setCards: (cards: CardInterface[]) => void
  ) => void;
  setDeckCards: (cards: CardInterface[]) => void;
  setGapIndex: (index: number | null) => void;
}

export default function CardInDeck({
  index,
  card,
  deckCards,
  isGapBefore,
  isGapAfter,
  isDragging,
  numberOfCards,
  handleDeckGapDetection,
  handleMouseDown,
  setDeckCards,
  setGapIndex,
}: CardProps) {
  return (
    <Card
      $card={card}
      $isGapBefore={isGapBefore}
      $isGapAfter={isGapAfter}
      $isDragging={isDragging}
      $numberOfCards={numberOfCards}
      onMouseOver={(e) => handleDeckGapDetection(e, index)} // keeps gap opened
      onMouseMove={(e) => handleDeckGapDetection(e, index)} // opens gap
      onMouseDown={(e) => handleMouseDown(e, index, deckCards, setDeckCards)}
      onMouseLeave={() => setGapIndex(null)}
      id={card.id}
    >
      <div className="card-container">
        {!card.hidden && (
          <div className="details">
            <div className="date">{card.date}</div>
            <div className="song">{card.song}</div>
            <div className="artist">{card.artist}</div>
          </div>
        )}
      </div>
    </Card>
  );
}

const Card = styled.div<{
  $card: CardInterface;
  $isGapBefore: boolean;
  $isGapAfter: boolean;
  $isDragging: boolean;
  $numberOfCards: number;
}>`
  aspect-ratio: 1/1;
  height: 100%;

  flex-shrink: 1;
  min-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */

  position: relative;
  user-select: none;
  transition: margin ${(props) => (props.$isDragging ? "0.3s" : "0s")} ease;
  margin-left: ${(props) => (props.$isGapBefore ? "100px" : "0")};
  margin-right: ${(props) => (props.$isGapAfter ? "100px" : "0")};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 0;
    pointer-events: ${(props) => (props.$isDragging ? "auto" : "none")};
    user-select: none;
    opacity: 0.5;
    /* background-color: red; */
  }

  &::before {
    right: 50%;
  }

  &::after {
    left: 50%;
  }

  &:first-child {
    &::before {
      width: calc(
        (100vw - (${(props) => props.$numberOfCards} - 1) * 100%) / 2 - 100px
      );
    }
  }

  &:last-child {
    &::after {
      width: calc(
        (100vw - (${(props) => props.$numberOfCards} - 1) * 100%) / 2 - 100px
      );
    }
  }

  .card-container {
    aspect-ratio: 1/1;
    width: 80%;

    display: flex;
    justify-content: center;
    align-content: center;

    position: relative;

    border-radius: 5%;

    background-image: ${(props) => `url(${props.$card.hidden ? "src/assets/hitster_logo_square.webp" : props.$card.albumCover})`};
    background-repeat: no-repeat;
    background-size: cover;

    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    transition: width 0.3s ease;
    cursor: pointer;
  }

  .details {
    width: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }
    .song,
    .artist {
      display: none;
      width: 100%;
    }
  }

  .hidden {
    display: none;
  }

  &:hover {
    ${(props) =>
      !props.$isDragging &&
      `
      .card-container {
        width: 90%;
      }

      .details {
        width: 80%;
        align-items: flex-start;
      }
      .date {
        display: none;
      }
      .song,
      .artist {
        font-size: 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-wrap: break-word;
      }
      .song {
        font-weight: bold;
      }
    `}
  }
`;
