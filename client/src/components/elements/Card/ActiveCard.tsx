import styled from "styled-components";
import { useEffect, useMemo, useRef } from "react";
import {Card} from "../../../type/item/Card.ts";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";
import {movementReducerCases} from "../../../stateProvider/movement/MovementReducerCases.ts";
import * as React from "react";
import useMouseDragOverDeck from "../../../hooks/movement/useMouseDragOverDeck.ts";
import useMouseOverDeck from "../../../hooks/movement/useMouseOverDeck.ts";
import useMouseDownCard from "../../../hooks/movement/useMouseDownCard.ts";
import {Position} from "../../../hooks/movement/getNewIndex.ts";

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

  const mouseDownEvents = useMemo(
    () => ({
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) =>
          mouseDownCard(e, card),
      onTouchStart: (e: React.TouchEvent<HTMLDivElement>) =>
          mouseDownCard(e, card),
    }),
    [card, mouseDownCard]
  );

  const mouseOverEvents = useMemo(
    () => (mousePosition: Position) => ({
      onMouseOver: (e: React.MouseEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, card, mousePosition)
          : mouseOverDeck(e, card, mousePosition),
      onTouchMove: (e: React.TouchEvent<HTMLDivElement>) =>
        isDragging
          ? mouseDragOverDeck(e, card, mousePosition)
          : mouseOverDeck(e, card, mousePosition),
    }),
    [card, isDragging, mouseDragOverDeck, mouseOverDeck]
  );

  const style = {
    backgroundImage: `url(${card.albumUrl})`,
    border: "none",
  };
  if (isDragging && card.id === currentCardId) {
    style.backgroundImage = "none";
    style.border = "2px solid var(--primary-text-color)";
  } else if (card.id === currentCardId) {
    style.backgroundImage = `url("src/assets/hitster_logo_square.webp")`;
    style.border = "none";
  }

  const cursorStyle = {
    cursor: "default",
  };
  if (isDragging) {
    cursorStyle.cursor = "grabbing";
  } else if (card.id === currentCardId) {
    cursorStyle.cursor = "grab";
  }

  return (
    <ActiveCardComponent {...mouseDownEvents} ref={cardRef}>
      <div className="card-container" style={style}>
         {card.id !== currentCardId && (
          <div className="details">
            <div className="date">{card.date}</div>
          </div>
         )}
      </div>
      <div className="card-hover left" {...mouseOverEvents(Position.LEFT)} style={ cursorStyle }/>
      <div className="card-hover right" {...mouseOverEvents(Position.RIGHT)} style={ cursorStyle }/>
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
    
  .card-hover {
    position: absolute;
    height: 100%;
    width: 50%;
    z-index: 1;
  }
    
  .card-hover.left {
    left: 0;
  }
    
  .card-hover.right {
    right: 0;
  }
    
  &:last-child {
    .card-hover.right {
        right: calc(-50vw + 50%);
        width: 50vw;
    }
  }
    
  &:first-child {
    .card-hover.left {
        left: calc(-50vw + 50%);
        width: 50vw;
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

    background-repeat: no-repeat;
    background-size: cover;

    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    transition: width 0.3s ease;
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
    padding: 0 4px 4px 4px;

    user-select: none;

    .date {
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1;
    }
  }
`;
