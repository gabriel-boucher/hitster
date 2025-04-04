import styled from "styled-components";
import { CardInterface } from "../../../utils/Interfaces";
import { useEffect, useMemo, useRef } from "react";
import { useStateProvider } from "../../../utils/StateProvider";

interface CardProps {
  card: CardInterface;
  isDragging: boolean;
  setDragPosition?: (position: { x: number; y: number }) => void;
  setActiveCardWidth?: (width: number) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
}

export default function CardInDeck({
  card,
  isDragging,
  setDragPosition,
  setActiveCardWidth,
  handleMouseOver,
  handleMouseDown,
}: CardProps) {
  const [{ activeCard }] = useStateProvider();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (setDragPosition && setActiveCardWidth && cardRef.current) {
      setActiveCardWidth(cardRef.current.offsetWidth);
    }
  });

  const handleMouseEvents = useMemo(
    () => ({
      onMouseOver: (e: React.MouseEvent<HTMLDivElement>) =>
        handleMouseOver(e, card),
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) =>
        handleMouseDown(e, card),
    }),
    [handleMouseOver, handleMouseDown]
  );

  const style = {
    backgroundImage: `url(${card.albumCover})`,
    border: "none"
  };
  if (isDragging && card.id === activeCard.id) {
    style.backgroundImage = "none";
    style.border = "2px solid white"
  } else if (card.id === activeCard.id) {
    style.backgroundImage = `url("src/assets/hitster_logo_square.webp")`;
    style.border = "none"
  }

  return (
    <Card
      $isDragging={isDragging}
      {...handleMouseEvents}
      ref={cardRef}
    >
      <div className="card-container" style={style}>
        {card.id !== activeCard.id && (
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
  $isDragging: boolean;
}>`
  height: 100%;
  min-width: 0;
  aspect-ratio: 1/1;

  flex-shrink: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  user-select: none;

  &:first-child::before,
  &:last-child::after {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    width: 100vw;
    pointer-events: ${(props) => (props.$isDragging ? "auto" : "none")};
    user-select: none;
  }

  &::before {
    right: 99%;
  }

  &::after {
    left: 99%;
  }

  .card-container {
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
