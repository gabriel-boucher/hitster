import styled from "styled-components";
import { useMemo } from "react";
import {Card} from "../../../type/item/Card.ts";
import * as React from "react";
import useMouseDownCard from "../../../hooks/socket/movement/useMouseDownCard.ts";

interface CardProps {
  index: number;
  card: Card;
}

export default function CardInStack({ index, card }: CardProps) {
  const mouseDownCard = useMouseDownCard();

  const handleMouseEvents = useMemo(() => ({
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => mouseDownCard(e, card),
    onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => mouseDownCard(e, card),
  }), [card, mouseDownCard]);

  return (
    <CardComponent
      {...handleMouseEvents}
      style={{
        bottom: index * 2,
        zIndex: index,
      }}
    >
      <div className="card-container"></div>
    </CardComponent>
  );
}

const CardComponent = styled.div`
  height: 16vh;
  width: 16vh;
  position: absolute;
  user-select: none;
  transition: box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .card-container {
    height: inherit;
    width: inherit;

    border: 1px solid white;
    border-radius: 5%;

    background-image: url("src/assets/hitster_logo_square.webp");
    background-repeat: no-repeat;
    background-size: cover;

    cursor: pointer;
  }
`;
