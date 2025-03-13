import styled from "styled-components";
import { CardInterface } from "../../../utils/Interfaces";

interface CardProps {
  index: number;
  card: CardInterface;
  stackCards: CardInterface[];
  setStackCards: (cards: CardInterface[]) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
    cards: CardInterface[],
    setCards: (cards: CardInterface[]) => void
  ) => void;
}

export default function CardInStack({
  index,
  card,
  stackCards,
  setStackCards,
  handleMouseDown,
}: CardProps) {
  return (
    <Card
      onMouseDown={(e) => handleMouseDown(e, index, stackCards, setStackCards)}
      id={card.id}
      style={{
        bottom: index * 4,
        zIndex: index,
      }}
    >
      <div className="card-container"></div>
    </Card>
  );
}

const Card = styled.div`
  height: 8rem;
  width: 8rem;
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
