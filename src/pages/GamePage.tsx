import styled from "styled-components";
import { useState, useEffect } from "react";
import { useMouseHandlers } from "../utils/MouseHandlers";
import DraggableCard from "../components/GamePage/Card/DraggableCard";
import PlayerBar from "../components/GamePage/Players/PlayerBar";
import ActivePlayerCards from "../components/GamePage/Card/ActivePlayerCards";
import PlayerCards from "../components/GamePage/Card/PlayerCards";
import PlayerTokens from "../components/GamePage/Token/PlayerTokens";
import StackCards from "../components/GamePage/Card/StackCards";
import useGameRules from "../utils/GameRules";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import { CardInterface } from "../utils/Interfaces";

export default function GamePage() {
  const [{ activePlayer, items, activeCard }, dispatch] = useStateProvider();
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [activeCardWidth, setActiveCardWidth] = useState(0);

  const {
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleMouseOver,
    handleMouseOverToken,
    handleTwoAdjacentTokens,
  } = useMouseHandlers(isDragging, setDragPosition, setIsDragging);

  const { nextTurn } = useGameRules();

  const stackCardsComponent = StackCards({
    handleMouseDown,
    handleMouseLeave,
  });
  const activePlayerCardsComponent = ActivePlayerCards({
    isDragging,
    setActiveCardWidth,
    handleMouseClick,
    handleMouseDown,
    handleMouseLeave,
    handleMouseOver,
    handleMouseOverToken,
  });
  const playerCardsComponent = PlayerCards({
    isDragging,
  });
  const playerTokensComponent = PlayerTokens();

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

  useEffect(() => {
    dispatch({
      type: reducerCases.SET_ACTIVE_CARD,
      activeCard: items
        .filter((item) => "song" in item)
        .filter((card) => card.id === activeCard.id)[0] as CardInterface,
    });
  }, [items, activeCard]);


  useEffect(() => {
    const newItems = [...items];
    handleTwoAdjacentTokens(newItems);
  }, [items, activePlayer]);
  

  return (
    <Container>
      <Menu>
        <button onClick={nextTurn}>Next Turn</button>
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
        {activePlayerCardsComponent}
      </Board>
      <Deck>
        {playerCardsComponent}
        {/* {playerTokensComponent} */}
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

const Container = styled.div`
  background-color: #0a1d36;
`;
