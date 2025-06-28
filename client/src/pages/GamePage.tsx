import styled from "styled-components";
import { useState, useEffect } from "react";
import useMouseHandlers from "../utils/MouseHandlers";
import SpotifyPlayer from "src/components/GamePage/SpotifyPlayer/SpotifyPlayer";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { isCard } from "@shared/utils";
import Header from "src/components/GamePage/Header/Header";
import Deck from "src/components/GamePage/Deck/Deck";
import DraggingOverlay from "src/components/GamePage/DraggingOverlay/DraggingOverlay";
import Board from "src/components/GamePage/Board/Board";
import ActivePlayerItems from "src/components/GamePage/ActiveItems/ActivePlayerItems";

export default function GamePage() {
  const [
    { socket, items, activeCard, isDragging },
    dispatch,
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
  } = useMouseHandlers(setDragPosition);

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
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Otherwise the card movement is fucked
  useEffect(() => {
    dispatch({
      type: reducerCases.SET_ACTIVE_CARD,
      activeCard: items
        .filter((item) => isCard(item))
        .filter((card) => card.id === activeCard.id)[0],
    });
  }, [items, activeCard, dispatch]);

  return (
    <Container>
      <DisableHoverContainer className={isDragging ? "disable-hover" : ""}>
        <Header setHoveredPlayerId={setHoveredPlayerId} setIsClickedPlayer={setIsClickedPlayer} />
        <Board handleMouseDown={handleMouseDown} handleMouseLeave={handleMouseLeave} activePlayerItemsComponent={activePlayerItemsComponent} />
        <SpotifyPlayer />
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
  background-color: #0a1d36;

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
