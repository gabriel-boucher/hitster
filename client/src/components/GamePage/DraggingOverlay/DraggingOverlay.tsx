import DraggableCard from "src/components/elements/Card/DraggableCard";
import styled from "styled-components";
import {useMovementStateProvider} from "../../../stateProvider/movement/MovementStateProvider.tsx";

export default function DraggingOverlay() {
  const [{ isDragging }] = useMovementStateProvider();

  return (
      <Container>
        {isDragging && (
          <DraggableCard />
      )}
      </Container>
  );
}

const Container = styled.div`
`;

