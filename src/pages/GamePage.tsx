import styled from "styled-components";
import { reducerCases } from "../utils/Constants";
import { useState, useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { useMouseHandlers } from "../utils/MouseHandlers";
import { CardInterface } from "../utils/Interfaces";
import { v4 as uuidv4 } from "uuid";
import DraggableCard from "../components/GamePage/Card/DraggableCard";
import PlayerBar from "../components/GamePage/Players/PlayerBar";
import PlayerCards from "../components/GamePage/Card/PlayerCards";
import PlayerTokens from "../components/GamePage/Token/PlayerTokens";
import StackCards from "../components/GamePage/Card/StackCards";

export default function GamePage() {
  const [{ players, activePlayer, cards, activeCard }, dispatch] =
    useStateProvider();

  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [spareCards, _] = useState<CardInterface[]>([...cards]);

  const {
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
    handleDeckGapDetection,
  } = useMouseHandlers(
    isDragging,
    dragOffset,
    setDragPosition,
    setDragOffset,
    setIsDragging
  );

  function revealCard(index: number) {
    const newPlayers = { ...players };
    newPlayers[activePlayer].cards[index].hidden = false;
    dispatch({ type: reducerCases.SET_PLAYERS, players: newPlayers });
  }

  function isRightAnswer(index: number) {
    const active = parseInt(activeCard.date);
    const before =
      index > 0
        ? parseInt(players[activePlayer].cards[index - 1].date)
        : -Infinity;
    const after =
      index < players[activePlayer].cards.length - 1
        ? parseInt(players[activePlayer].cards[index + 1].date)
        : Infinity;

    return before <= active && active <= after;
  }

  function removeCard(index: number) {
    setTimeout(() => {
      const newPlayers = { ...players };
      newPlayers[activePlayer].cards.splice(index, 1);
      dispatch({ type: reducerCases.SET_PLAYERS, players: newPlayers });
    }, 1000);
  }

  function refillCards() {
    const newCards = spareCards.map((card) => ({
      ...card,
      id: uuidv4(),
      hidden: true, // cards are changed to hidden false during the process (don't know why)
    }));
    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    dispatch({
      type: reducerCases.SET_ACTIVE_CARD,
      activeCard: newCards[newCards.length - 1],
    }); // use cards because react doesn't update stackCards in time to use stackCards
  }

  function nextTurn() {
    const index = players[activePlayer].cards.indexOf(activeCard);
    if (index === -1) return;

    revealCard(index);

    if (!isRightAnswer(index)) {
      removeCard(index);
    }

    dispatch({
      type: reducerCases.SET_ACTIVE_CARD,
      activeCard: cards[cards.length - 1],
    });

    if (cards.length === 0) {
      refillCards();
    }
  }

  const stackCardsComponent = StackCards({ handleMouseDown });
  const playerCardsComponent = PlayerCards({ isDragging, handleDeckGapDetection, handleMouseDown });
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

  return (
    <Container>
      <Menu>
        <button onClick={nextTurn}>Next Turn</button>
      </Menu>
      {isDragging && <DraggableCard dragPosition={dragPosition} />}
      <Board>
        <PlayerBar />
        {stackCardsComponent}
        {playerCardsComponent}
      </Board>
      <Deck>
        {playerCardsComponent}
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

const Container = styled.div``;
