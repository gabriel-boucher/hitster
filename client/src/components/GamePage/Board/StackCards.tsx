import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import CardInStack from "../../elements/Card/CardInStack";
import { CardInterface } from "@shared/Interfaces";
import { isCard } from "@shared/utils";
import { useMemo } from "react";

interface CardProps {
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
}

export default function StackCards({
  handleMouseDown,
  handleMouseLeave,
}: CardProps) {
  const [{ items }] = useStateProvider();

  const handleMouseEvents = useMemo(() => ({
    onMouseLeave: handleMouseLeave,
    onTouchEnd: handleMouseLeave,
  }), [handleMouseLeave]);

  return (
    <Container>
      <Stack {...handleMouseEvents}>
        {items
          .filter((item): item is CardInterface => isCard(item) && item.playerId === null)
          .map((card, index) => (
            <CardInStack
              key={card.id}
              index={index}
              card={card}
              handleMouseDown={handleMouseDown}
            />
          ))}
      </Stack>
    </Container>
  );
}

const Stack = styled.div`
  height: 16vh;
  width: 16vh;
  user-select: none;
  position: relative;
`;

const Container = styled.div`
  /* flex: 1; */
  display: flex;
  /* justify-content: right; */
  align-items: center;
  /* margin-right: -16vh; */
`;
