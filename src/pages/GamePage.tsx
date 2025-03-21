import styled from "styled-components";
import { useState, useEffect, useRef, use, useMemo, useCallback } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { CardInterface } from "../utils/Interfaces";
import CardInDeck from "../components/GamePage/Card/CardInDeck";
import CardInStack from "../components/GamePage/Card/CardInStack";
import DraggableCard from "../components/GamePage/Card/DraggableCard";
import TokenInDeck from "../components/GamePage/Token/TokenInDeck";
import PlayerInGame from "../components/GamePage/Players/PlayerInGame";

export default function GamePage() {
  const [{ playerCards, cards }] = useStateProvider();

  const [deckCards, setDeckCards] = useState<CardInterface[]>([...playerCards]);
  const [stackCards, setStackCards] = useState<CardInterface[]>([...cards]);
  const [gapIndex, setGapIndex] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<CardInterface>(
    stackCards[stackCards.length - 1]
  );
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [deckTokens, setDeckTokens] = useState([0, 1, 2, 3, 4]);

  const [players, setPlayers] = useState([0, 1, 2]);
  const [activePlayer, setActivePlayer] = useState(0);

  const playerCardsRef = useRef<HTMLDivElement | null>(null);

  const isRightAnswer = (index: number) => {
    const active = parseInt(activeCard.date);
    const before = index > 0 ? parseInt(deckCards[index - 1].date) : -Infinity;
    const after =
      index < deckCards.length - 1
        ? parseInt(deckCards[index + 1].date)
        : Infinity;

    return before <= active && active <= after;
  };

  const nextTurn = () => {
    const index = deckCards.indexOf(activeCard);
    if (index === -1) return;

    const newDeckCards = [...deckCards];
    newDeckCards[index].hidden = false;
    setDeckCards(newDeckCards);

    if (!isRightAnswer(index)) {
      setTimeout(() => {
        const newDeckCards = [...deckCards];
        newDeckCards.splice(index, 1);
        setDeckCards(newDeckCards);
      }, 1000);
    }

    if (stackCards.length === 0) {
      const newStackCards = cards.map((card) => ({
        ...card,
        id: (parseInt(card.id) + parseInt(activeCard.id)).toString(),
        hidden: true, // cards are changed to hidden false during the process (don't know why)
      }));
      setStackCards(newStackCards);
      setActiveCard(newStackCards[newStackCards.length - 1]); // use cards because react doesn't update stackCards in time to use stackCards
    } else {
      setActiveCard(stackCards[stackCards.length - 1]);
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      requestAnimationFrame(() => {
        setDragPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      });
    }
  }, [isDragging, dragOffset, setDragPosition]);

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      if (gapIndex !== null) {
        // card dropped in the deck
        const newDeckCards = [...deckCards];
        newDeckCards.splice(gapIndex, 0, activeCard);
        setDeckCards(newDeckCards);
      } else {
        // card returns to the stack
        const newStackCards = [...stackCards];
        newStackCards.push(activeCard!);
        setStackCards(newStackCards);
      }
      setGapIndex(null);
      setIsDragging(false);

      setDragPosition({ x: 0, y: 0 });
    }
  }, [isDragging, gapIndex, deckCards, stackCards, setDeckCards, setStackCards]);

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      index: number,
      cards: CardInterface[],
      setCards: (cards: CardInterface[]) => void
    ) => {
      if (e.currentTarget.id === activeCard.id) {
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
          x: rect.width / 2,
          y: rect.height / 2,
        });
        setDragPosition({
          x: e.clientX - rect.width / 2,
          y: e.clientY - rect.height / 2,
        });
        const newCards = [...cards];
        newCards.splice(index, 1);
        setCards(newCards);

        setIsDragging(true);
      }
    },
    [activeCard]
  );

  const handleDeckGapDetection = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
      if (isDragging) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        setGapIndex(mouseX < rect.width / 2 ? cardIndex : cardIndex + 1);
      }
    },
    [isDragging]
  );

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

  const stackComponent = useMemo(
    () => (
      <Stack>
        {stackCards.map((card, index) => (
          <CardInStack
            key={card.id}
            index={index}
            card={card}
            stackCards={stackCards}
            setStackCards={setStackCards}
            handleMouseDown={handleMouseDown}
          />
        ))}
      </Stack>
    ),
    [stackCards, activeCard]
  );

  const playersComponent = useMemo(
    () => (
      <Players>
        {players.map((player, index) => (
          <PlayerInGame key={index} isActivePlayer={activePlayer === index} />
        ))}
      </Players>
    ),
    [players, activePlayer]
  );

  const playerCardsComponent = useMemo(
    () => (
      <PlayerCardsInPlay ref={playerCardsRef}>
        {deckCards.map((card, index) => (
          <CardInDeck
            key={card.id}
            index={index}
            playerCardsRef={playerCardsRef}
            card={card}
            deckCards={deckCards}
            isGapBefore={gapIndex === index}
            isGapAfter={gapIndex === index + 1}
            isDragging={isDragging}
            numberOfCards={deckCards.length}
            handleDeckGapDetection={handleDeckGapDetection}
            handleMouseDown={handleMouseDown}
            setDeckCards={setDeckCards}
            setGapIndex={setGapIndex}
          />
        ))}
      </PlayerCardsInPlay>
    ),
    [deckCards, gapIndex, isDragging, handleDeckGapDetection]
  );

  const playerTokensComponent = useMemo(
    () => (
      <PlayerTokens>
        {deckTokens.map((token, index) => (
          <TokenInDeck key={index} />
        ))}
      </PlayerTokens>
    ),
    [deckTokens]
  );

  return (
    <Container>
      <Menu>
        <button onClick={nextTurn}>Next Turn</button>
      </Menu>
      {isDragging && <DraggableCard dragPosition={dragPosition} />}
      <Board>
        {stackComponent}
        {playersComponent}
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

const PlayerCards = styled.div`
  height: 100%;
  max-width: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: black;
  padding-left: 1%;
  padding-right: 1%;
`;

const PlayerTokens = styled.div`
  height: 100%;
  max-width: 20%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: blue;
  padding-left: 1%;
  padding-right: 1%;
`;

const Board = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Players = styled(PlayerTokens)`
  position: absolute;
  top: 10vh;
  height: 10%;
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const PlayerCardsInPlay = styled(PlayerCards)`
  height: 20vh;
  /* background-color: green; */
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
