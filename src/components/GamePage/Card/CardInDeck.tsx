import styled from "styled-components";
import { CardInterface } from "../../../utils/Interfaces";
import { useMemo, useRef } from "react";
import { reducerCases } from "../../../utils/Constants";
import { useStateProvider } from "../../../utils/StateProvider";

interface CardProps {
  index: number;
  playerCardsRef: React.RefObject<HTMLDivElement | null>;
  card: CardInterface;
  isGapBefore: boolean;
  isGapAfter: boolean;
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

export default function CardInDeck({
  index,
  playerCardsRef,
  card,
  isGapBefore,
  isGapAfter,
  isDragging,
  handleDeckGapDetection,
  handleMouseDown,
}: CardProps) {
  const [{players, activePlayer}, dispatch] = useStateProvider();
  const elementRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEvents = useMemo(() => ({
    onMouseOver: (e: React.MouseEvent<HTMLDivElement>) => handleDeckGapDetection(e, index),
    onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => handleDeckGapDetection(e, index),
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => handleMouseDown(e, reducerCases.SET_PLAYERS),
    onMouseLeave: () => dispatch({ type: reducerCases.SET_GAP_INDEX, gapIndex: null })
  }), [index, handleDeckGapDetection, handleMouseDown, dispatch]);

  return (
    <Card
      $card={card}
      $isGapBefore={isGapBefore}
      $isGapAfter={isGapAfter}
      $isDragging={isDragging}
      $numberOfCards={players[activePlayer].cards.length}
      $width={elementRef.current?.offsetWidth}
      $containerHeight={playerCardsRef.current?.offsetHeight}
      $containerWidth={playerCardsRef.current?.offsetWidth}
      {...handleMouseEvents}
      id={card.id}
      ref={elementRef}
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
  $width?: number;
  $containerHeight?: number;
  $containerWidth?: number;
}>`
  height: 100%;
  min-width: 0;
  aspect-ratio: 1/1;

  flex-shrink: 1;

  width: ${(props) =>
    props.$containerWidth! >= (props.$numberOfCards + 1) * props.$containerHeight!
      ? `${props.$containerHeight}px`
      : `${props.$containerWidth! / (props.$numberOfCards + 1)}px`};

  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: pink; */

  position: relative;
  user-select: none;

  transition: margin ${(props) => (props.$isDragging ? "0.3s" : "0s")} ease;
  margin-left: ${(props) =>
    props.$isGapBefore ? `${props.$width && props.$width / 2}px` : "0"};
  margin-right: ${(props) =>
    props.$isGapAfter ? `${props.$width && props.$width / 2}px` : "0"};

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
    margin-left: ${(props) =>
      props.$isGapBefore ? `${props.$width && props.$width}px` : "0"};
    &::before {
      width: 100vh;
    }
  }

  &:last-child {
    margin-right: ${(props) =>
      props.$isGapAfter ? `${props.$width && props.$width}px` : "0"};
    &::after {
      width: 100vh;
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

    background-image: ${(props) =>
      `url(${
        props.$card.hidden
          ? "src/assets/hitster_logo_square.webp"
          : props.$card.albumCover
      })`};
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
