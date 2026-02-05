import styled from "styled-components";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";

export default function DraggableCard() {
  const [{ isDragging, currentCardWidth, draggingPosition }] = useMovementStateProvider();

  return (
    <>
      {isDragging && (
        <Card
          style={{
            left: draggingPosition.x - currentCardWidth / 2,
            top: draggingPosition.y - currentCardWidth / 2,
            width: currentCardWidth,
          }}
        ></Card>
      )}
    </>
  );
}

const Card = styled.div`
  aspect-ratio: 1/1;
  position: absolute;

  border: 1px solid var(--primary-text-color);
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
