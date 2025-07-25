import styled from "styled-components";
import { CardInterface } from "@shared/Interfaces";
import { useEffect, useMemo, useRef } from "react";
import { useStateProvider } from "../../../utils/StateProvider";

interface CardProps {
  card: CardInterface;
  setActiveCardWidth: (width: number) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseDraggingOver: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
}

export default function ActiveCard({
  card,
  setActiveCardWidth,
  handleMouseDraggingOver,
  handleMouseOver,
  handleMouseDown,
}: CardProps) {
  const [{ isDragging }] = useStateProvider();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      setActiveCardWidth(cardRef.current.offsetWidth * 0.8);
    }
  });

  const handleMouseEvents = useMemo(
    () => ({
      onMouseOver: (e: React.MouseEvent<HTMLDivElement>) =>
        isDragging
          ? handleMouseDraggingOver(e, card)
          : handleMouseOver(e, card),
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) =>
        handleMouseDown(e, card),
      onTouchMove: (e: React.TouchEvent<HTMLDivElement>) =>
        isDragging
          ? handleMouseDraggingOver(e, card)
          : handleMouseOver(e, card),
      onTouchStart: (e: React.TouchEvent<HTMLDivElement>) =>
        handleMouseDown(e, card),
    }),
    [card, isDragging, handleMouseOver, handleMouseDraggingOver, handleMouseDown]
  );

  const style = {
    backgroundImage: `url(${card.albumCover})`,
    border: "none",
  };
  if (isDragging && card.active) {
    style.backgroundImage = "none";
    style.border = "2px solid white";
  } else if (card.active) {
    style.backgroundImage = `url("src/assets/hitster_logo_square.webp")`;
    style.border = "none";
  }

  return (
    <Card {...handleMouseEvents} ref={cardRef}>
      <div className="card-container" style={style}>
        {/* {card.id !== activeCard.id && (  */}
          <div className="details">
            <div className="date">{card.date}</div>
          </div>
        {/* )} */}
      </div>
    </Card>
  );
}

const Card = styled.div`
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
  }
`;
