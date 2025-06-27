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
          left: dragPosition.x - (0.8 * activeCardWidth) / 2,
          top: dragPosition.y - (0.8 * activeCardWidth) / 2,
          width: activeCardWidth,
          position: "absolute",
          zIndex: "1000",
          pointerEvents: "none",
          willChange: "transform",
        }}
      >
        <div className="card-container"></div>
      </Card>
    )}
    </>
  );
}

const Card = styled.div`
  aspect-ratio: 1/1;
  user-select: none;

  .card-container {
    aspect-ratio: 1/1;
    width: 80%;

    border: 1px solid white;
    border-radius: 5%;

    background-image: url("src/assets/hitster_logo_square.webp");
    background-repeat: no-repeat;
    background-size: cover;

    cursor: grabbing;
  }
`;
