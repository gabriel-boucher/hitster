import styled from "styled-components";

interface CardProps {
  dragPosition: { x: number; y: number };
}

export default function DraggableCard({ dragPosition }: CardProps) {
  return (
    <Card
      style={{
        left: dragPosition.x,
        top: dragPosition.y,
        position: "absolute",
        zIndex: "1000",
        pointerEvents: "none",
      }}
    >
      <div className="card-container"></div>
    </Card>
  );
}

const Card = styled.div`
  height: 8rem;
  width: 8rem;
  user-select: none;

  .card-container {
    height: inherit;
    width: inherit;

    border: 1px solid white;
    border-radius: 5%;

    background-image: url("src/assets/hitster_logo_square.webp");
    background-repeat: no-repeat;
    background-size: cover;

    cursor: grabbing;
  }
`;
