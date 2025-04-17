import styled from "styled-components";
import { useState, useEffect } from "react";
import useMouseHandlers from "../utils/MouseHandlers";
import DraggableCard from "../components/GamePage/Card/DraggableCard";
import PlayerBar from "../components/GamePage/Players/PlayerBar";
import ActivePlayerItems from "../components/GamePage/ActiveItems/ActivePlayerItems";
import PlayerCards from "../components/GamePage/Card/PlayerCards";
import PlayerTokens from "../components/GamePage/Token/PlayerTokens";
import StackCards from "../components/GamePage/Card/StackCards";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { isCard } from "../../../utils";
import { socketEvents } from "../../../Constants";

export default function GamePage() {
  const [
    { socket, gameState, players, activePlayer, items, activeCard },
    dispatch,
  ] = useStateProvider();
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [activeCardWidth, setActiveCardWidth] = useState(0);

  const {
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleMouseDraggingOver,
    handleMouseOver,
  } = useMouseHandlers(isDragging, setDragPosition, setIsDragging);

  const stackCardsComponent = StackCards({
    handleMouseDown,
    handleMouseLeave,
  });
  const activePlayerItemsComponent = ActivePlayerItems({
    isDragging,
    setActiveCardWidth,
    handleMouseClick,
    handleMouseDown,
    handleMouseLeave,
    handleMouseDraggingOver,
    handleMouseOver,
  });
  const playerCardsComponent = PlayerCards({
    isDragging,
  });
  const playerTokensComponent = PlayerTokens();

  function handleNextTurn() {
    socket.emit(socketEvents.NEXT_TURN, {
      gameState,
      players,
      activePlayer,
      items,
      activeCard,
    });
  }

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
      <Menu>
        {socket.id === activePlayer.socketId && (
          <button onClick={handleNextTurn}>Next Turn</button>
        )}
      </Menu>
      {isDragging && (
        <DraggableCard
          dragPosition={dragPosition}
          activeCardWidth={activeCardWidth}
        />
      )}
      <Board>
        <PlayerBar />
        {stackCardsComponent}
        {activePlayerItemsComponent}
      </Board>
      <Deck>
        {playerCardsComponent}
        <Separator />
        {playerTokensComponent}
      </Deck>
    </Container>
  );
}

const Deck = styled.div`
  display: flex;
  height: 20vh;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0 4px 30px hsla(0, 0%, 0%, 10%);
  background: hsla(0, 0%, 100%, 20%);
  user-select: none;
  position: relative;
`;

const Board = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Menu = styled.div`
  height: 10vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px 0px 20px;
`;

const Separator = styled.div`
  position: absolute;
  right: 6.8%;
  top: 5%;
  width: 0.1rem;
  height: 90%;
  background-color: #fff;
`;

const Container = styled.div`
  background-color: #0a1d36;
`;
