import styled from "styled-components";
import { useEffect, useMemo, useRef } from "react";
import {Card} from "../../../type/item/Card.ts";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import {movementReducerCases} from "../../../stateProvider/movement/MovementReducerCases.ts";
import * as React from "react";
import useMouseDragOverDeck from "../../../hooks/socket/movement/useMouseDragOverDeck.ts";
import useMouseOverDeck from "../../../hooks/socket/movement/useMouseOverDeck.ts";
import useMouseDownCard from "../../../hooks/socket/movement/useMouseDownCard.ts";

export default function ActiveCard({ card }: { card: Card }) {
  const [{ currentCardId }] = useGameStateProvider();
  const [{ isDragging }, dispatchMovementState] = useMovementStateProvider();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    dispatchMovementState({ type: movementReducerCases.SET_CURRENT_CARD_WIDTH, currentCardWidth: cardRef.current.offsetWidth * 0.8})
  }, [dispatchMovementState]);

  const mouseDragOverDeck = useMouseDragOverDeck()
  const mouseOverDeck = useMouseOverDeck()
  const mouseDownCard = useMouseDownCard()

  const handleMouseEvents = useMemo(
    () => ({
      onMouseOver: (e: React.MouseEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, card)
          : mouseOverDeck(e, card),
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) =>
          mouseDownCard(e, card),
      onTouchMove: (e: React.TouchEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, card)
          : mouseOverDeck(e, card),
      onTouchStart: (e: React.TouchEvent<HTMLDivElement>) =>
          mouseDownCard(e, card),
    }),
    [card, isDragging, mouseDragOverDeck, mouseOverDeck, mouseDownCard]
  );

  const style = {
    backgroundImage: `url(${card.albumUrl})`,
    border: "none",
  };
  if (isDragging && card.id === currentCardId) {
    style.backgroundImage = "none";
    style.border = "2px solid white";
  } else if (card.id === currentCardId) {
    style.backgroundImage = `url("src/assets/hitster_logo_square.webp")`;
    style.border = "none";
  }

  return (
    <ActiveCardComponent {...handleMouseEvents} ref={cardRef}>
      <div className="card-container" style={style}>
         {card.id !== currentCardId && (
          <div className="details">
            <div className="date">{card.date}</div>
          </div>
         )}
      </div>
    </ActiveCardComponent>
  );
}

const ActiveCardComponent = styled.div`
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
