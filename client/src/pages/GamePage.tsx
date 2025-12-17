import styled from "styled-components";
import { useState, useEffect } from "react";
import useMouseHandlers from "../hooks/useMouseHandlers";
import { useStateProvider } from "../utils/StateProvider";
import Header from "src/components/GamePage/Header/Header";
import Deck from "src/components/GamePage/Deck/Deck";
import DraggingOverlay from "src/components/GamePage/DraggingOverlay/DraggingOverlay";
import Board from "src/components/GamePage/Board/Board";
import ActivePlayerItems from "src/components/GamePage/ActiveItems/ActivePlayerItems";

export default function GamePage() {
  const [
    { socket, isDragging }
  ] = useStateProvider();
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [activeCardWidth, setActiveCardWidth] = useState(0);
  const [hoveredPlayerId, setHoveredPlayerId] = useState(socket.id!);
  const [isClickedPlayer, setIsClickedPlayer] = useState(false);

  const {
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleMouseDraggingOver,
    handleMouseOver,
  } = useMouseHandlers(activeCardWidth, setDragPosition);

  const activePlayerItemsComponent = ActivePlayerItems({
    setActiveCardWidth,
    handleMouseClick,
    handleMouseDown,
    handleMouseLeave,
    handleMouseDraggingOver,
    handleMouseOver,
  });

  useEffect(() => {
    if (isDragging) {
      // Mouse events
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
  
      // Touch events
      window.addEventListener("touchmove", handleMouseMove);
      window.addEventListener("touchend", handleMouseUp);
  
      return () => {
        // Mouse events
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
  
        // Touch events
        window.removeEventListener("touchmove", handleMouseMove);
        window.removeEventListener("touchend", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);
  

  return (
    <Container>
      <DisableHoverContainer className={isDragging ? "disable-hover" : ""}>
        <Header />
        <Board setHoveredPlayerId={setHoveredPlayerId} setIsClickedPlayer={setIsClickedPlayer} handleMouseDown={handleMouseDown} handleMouseLeave={handleMouseLeave} activePlayerItemsComponent={activePlayerItemsComponent} />
      </DisableHoverContainer>
      <Deck hoveredPlayerId={hoveredPlayerId} isClickedPlayer={isClickedPlayer} activePlayerItemsComponent={activePlayerItemsComponent} />
      <DraggingOverlay dragPosition={dragPosition} activeCardWidth={activeCardWidth} />
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
