import styled from "styled-components";
import { reducerCases } from "../../../utils/Constants";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInStack from "./CardInStack";

interface CardProps {
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: reducerCases.SET_PLAYERS | reducerCases.SET_CARDS
  ) => void;
}

export default function StackCards({
  handleMouseDown,
}: CardProps) {
  const [{ cards }] = useStateProvider();
  return (
      <Stack>
        {cards.map((card, index) => (
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
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;