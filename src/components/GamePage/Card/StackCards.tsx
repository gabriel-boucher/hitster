import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInStack from "./CardInStack";
import { CardInterface } from "../../../utils/Interfaces";
import { isCard } from "../../../utils/Items";

interface CardProps {
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
}

export default function StackCards({
  handleMouseDown,
  handleMouseLeave,
}: CardProps) {
  const [{ items }] = useStateProvider();
  return (
    <Stack onMouseLeave={handleMouseLeave}>
      {items
        .filter((item) => isCard(item))
        .filter((card) => card.playerId === null)
        .map((card, index) => (
          <CardInStack
            key={card.id}
            index={index}
            card={card}
            handleMouseDown={handleMouseDown}
          />
        ))}
    </Stack>
  );
}

const Stack = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;
