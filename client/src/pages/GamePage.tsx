import styled from "styled-components";
import { useState, useEffect } from "react";
import Header from "src/components/GamePage/Header/Header";
import Deck from "src/components/GamePage/Deck/Deck";
import DraggingOverlay from "src/components/GamePage/DraggingOverlay/DraggingOverlay";
import Board from "src/components/GamePage/Board/Board";
import {useConnectionStateProvider} from "../stateProvider/connection/ConnectionStateProvider.tsx";
import {useMovementStateProvider} from "../stateProvider/movement/MovementStateProvider.tsx";
import useMouseDrag from "../hooks/socket/movement/useMouseDrag.ts";
import useMouseUpCard from "../hooks/socket/movement/useMouseUpCard.ts";

export default function GamePage() {
  const [{ playerId }] = useConnectionStateProvider();
  const [{ isDragging }] = useMovementStateProvider();
  const [hoveredPlayerId, setHoveredPlayerId] = useState(playerId);
  const [isClickedPlayer, setIsClickedPlayer] = useState(false);

  const mouseDrag = useMouseDrag()
  const mouseUpCard = useMouseUpCard()

  useEffect(() => {
    if (!isDragging) return;
    // Mouse events
    window.addEventListener("mousemove", mouseDrag);
    window.addEventListener("mouseup", mouseUpCard);

    // Touch events
    window.addEventListener("touchmove", mouseDrag);
    window.addEventListener("touchend", mouseUpCard);

    return () => {
      // Mouse events
      window.removeEventListener("mousemove", mouseDrag);
      window.removeEventListener("mouseup", mouseUpCard);

      // Touch events
      window.removeEventListener("touchmove", mouseDrag);
      window.removeEventListener("touchend", mouseUpCard);
    };
  }, [isDragging, mouseDrag, mouseUpCard]);
  

  return (
    <Container>
      <DisableHoverContainer className={isDragging ? "disable-hover" : ""}>
        <Header />
        <Board setHoveredPlayerId={setHoveredPlayerId} setIsClickedPlayer={setIsClickedPlayer} />
      </DisableHoverContainer>
      <Deck hoveredPlayerId={hoveredPlayerId} isClickedPlayer={isClickedPlayer} />
      <DraggingOverlay />
    </Container>
  );
}

const DisableHoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 74vh;

  &.disable-hover {
    pointer-events: none;
  }
`

const Container = styled.div`
  height: 100vh;
  /* background-color: #0a1d36; */

  /* &::before {
    content: "";
    position: absolute;
    background: linear-gradient(purple, orangered);
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
  } */
`;
