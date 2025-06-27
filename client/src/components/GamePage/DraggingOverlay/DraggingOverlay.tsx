import DraggableCard from "src/components/elements/Card/DraggableCard";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";

interface CardProps {
    dragPosition: { x: number; y: number };
    activeCardWidth: number;
}

export default function DraggingOverlay({ dragPosition, activeCardWidth }: CardProps) {
  const [{ isDragging }] = useStateProvider();

  return (
      <Container>
        {isDragging && (
          <DraggableCard
            dragPosition={dragPosition}
            activeCardWidth={activeCardWidth}
          />
      )}
      </Container>
  );
}

const Container = styled.div`
`;

