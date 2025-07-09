import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";

interface CardProps {
  dragPosition: { x: number; y: number };
  activeCardWidth: number;
}

export default function DraggableCard({
  dragPosition,
  activeCardWidth,
}: CardProps) {
  const [{ isDragging }] = useStateProvider();
  return (
    <>
      {isDragging && (
        <Card
          style={{
            left: dragPosition.x - activeCardWidth / 2,
            top: dragPosition.y - activeCardWidth / 2,
            width: activeCardWidth,
          }}
        ></Card>
      )}
    </>
  );
}

const Card = styled.div`
  aspect-ratio: 1/1;
  position: absolute;

  border: 1px solid white;
  border-radius: 5%;

  background-image: url("src/assets/hitster_logo_square.webp");
  background-repeat: no-repeat;
  background-size: cover;

  cursor: grabbing;
  user-select: none;
  pointer-events: none;
  z-index: 1000;
  will-change: transform;
`;
