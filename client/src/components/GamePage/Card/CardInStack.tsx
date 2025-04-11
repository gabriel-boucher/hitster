import styled from "styled-components";
import { CardInterface } from "../../../utils/Interfaces";
import { useMemo } from "react";

interface CardProps {
  index: number;
  card: CardInterface;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
}

export default function CardInStack({
  index,
  card,
  handleMouseDown,
}: CardProps) {

  const handleMouseEvents = useMemo(() => ({
    onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => handleMouseDown(e, card),
  }), [card, handleMouseDown]);

  return (
    <Card
      {...handleMouseEvents}
      style={{
        bottom: index * 2,
        zIndex: index,
      }}
    >
      <div className="card-container"></div>
    </Card>
  );
}

const Card = styled.div`
  height: 16vh;
  width: 16vh;
  position: absolute;
  margin-bottom: 40px;
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
