import styled from "styled-components";
import { CardInterface } from "../utils/Interfaces";
import { useStateProvider } from "../utils/StateProvider";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface CardProps {
  index: number;
  card: CardInterface;
}

export default function CardInStack({ index, card }: CardProps) {
  const [{ activeCard }] = useStateProvider();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isSorting,
  } = useSortable({
    id: card.id,
    data: {
      type: "CardInStack",
      card,
    },
    disabled: card.id !== activeCard.id,
  });

  const style = {
    transition,
    transform: isSorting ? undefined : CSS.Translate.toString(transform),
    bottom: index * 4,
    zIndex: index,
  };

  if (isDragging) return;

  return (
    <Card id={card.id} style={style} ref={setNodeRef} {...attributes} {...listeners}>
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
