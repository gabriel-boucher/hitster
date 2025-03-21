import styled from "styled-components";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { useStateProvider } from "../utils/StateProvider";
import { CardInterface } from "../utils/Interfaces";
import CardInDeck from "../components/GamePage/Card/CardInDeck";
import CardInStack from "../components/GamePage/Card/CardInStack";
import DraggableCard from "../components/GamePage/Card/DraggableCard";
import PlayerInGame from "../components/GamePage/Players/PlayerInGame";

// Types
interface DragPosition {
  x: number;
  y: number;
}

// Custom hook with throttled drag handling
function useDragAndDrop(
  activeCard: CardInterface | null,
  deckCards: CardInterface[],
  stackCards: CardInterface[],
  setDeckCards: Dispatch<SetStateAction<CardInterface[]>>,
  setStackCards: Dispatch<SetStateAction<CardInterface[]>>
) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<DragPosition>({
    x: 0,
    y: 0,
  });
  const [dragOffset, setDragOffset] = useState<DragPosition>({ x: 0, y: 0 });
  const [gapIndex, setGapIndex] = useState<number | null>(null);

  // Refs for performance optimization
  const activeCardRef = useRef<CardInterface | null>(null);
  const requestRef = useRef<number | null>(null);
  const pendingPosition = useRef<DragPosition | null>(null);

  // Update ref when activeCard changes
  useEffect(() => {
    activeCardRef.current = activeCard;
  }, [activeCard]);

  // Throttled position update using requestAnimationFrame
  const updateDragPosition = useCallback((newPosition: DragPosition) => {
    pendingPosition.current = newPosition;

    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(() => {
        if (pendingPosition.current) {
          setDragPosition(pendingPosition.current);
          pendingPosition.current = null;
        }
        requestRef.current = null;
      });
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;

      updateDragPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    },
    [isDragging, dragOffset, updateDragPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging && activeCardRef.current) {
      if (gapIndex !== null) {
        // Card dropped in the deck
        setDeckCards((prev) => {
          const newDeckCards = [...prev];
          newDeckCards.splice(gapIndex, 0, activeCardRef.current!);
          return newDeckCards;
        });
      } else {
        // Card returns to the stack
        setStackCards((prev) => [...prev, activeCardRef.current!]);
      }

      setGapIndex(null);
      setIsDragging(false);
      setDragPosition({ x: 0, y: 0 });

      // Cancel any pending animation frame
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    }
  }, [isDragging, gapIndex, setDeckCards, setStackCards]);

  const handleDeckGapDetection = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
      if (!isDragging) return;

      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      setGapIndex(mouseX < rect.width / 2 ? cardIndex : cardIndex + 1);
    },
    [isDragging]
  );

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      index: number,
      cards: CardInterface[],
      setCards: (cards: CardInterface[]) => void,
      card: CardInterface
    ) => {
      if (activeCard && e.currentTarget.id === activeCard.id) {
        // Performance optimization: prevent default browser actions
        e.preventDefault();

        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });

        updateDragPosition({
          x: e.clientX - (e.clientX - rect.left),
          y: e.clientY - (e.clientY - rect.top),
        });

        setCards(cards.filter((_, i) => i !== index));
        setIsDragging(true);
      }
    },
    [activeCard, updateDragPosition]
  );

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);

        // Clean up any pending animation frames
        if (requestRef.current) {
          cancelAnimationFrame(requestRef.current);
          requestRef.current = null;
        }
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    isDragging,
    dragPosition,
    gapIndex,
    handleMouseDown,
    handleDeckGapDetection,
    setGapIndex,
  };
}

// Game logic hook remains the same
function useGameLogic(
  initialPlayerCards: CardInterface[],
  initialCards: CardInterface[]
) {
  const [deckCards, setDeckCards] = useState<CardInterface[]>([
    ...initialPlayerCards,
  ]);
  const [stackCards, setStackCards] = useState<CardInterface[]>([
    ...initialCards,
  ]);
  const [activeCard, setActiveCard] = useState<CardInterface | null>(
    stackCards.length > 0 ? stackCards[stackCards.length - 1] : null
  );

  const isRightAnswer = useCallback(
    (index: number) => {
      if (!activeCard) return false;

      const active = parseInt(activeCard.date);
      const before =
        index > 0 ? parseInt(deckCards[index - 1].date) : -Infinity;
      const after =
        index < deckCards.length - 1
          ? parseInt(deckCards[index + 1].date)
          : Infinity;

      return before <= active && active <= after;
    },
    [activeCard, deckCards]
  );

  const nextTurn = useCallback(() => {
    if (!activeCard) return;
    const index = deckCards.findIndex((card) => card.id === activeCard.id);
    if (index === -1) return;
    
    // Update card visibility
    setDeckCards((prevCards) => {
      const newDeckCards = [...prevCards];
      if (newDeckCards[index]) {
        newDeckCards[index] = { ...newDeckCards[index], hidden: false };
      }
      return newDeckCards;
    });

    // Handle incorrect answer
    if (!isRightAnswer(index)) {
      setTimeout(() => {
        setDeckCards((prevCards) => {
          const newDeckCards = [...prevCards];
          newDeckCards.splice(index, 1);
          return newDeckCards;
        });
      }, 1000);
    }

    // Replenish stack if needed
    if (stackCards.length === 0) {
      const newStackCards = initialCards.map((card) => ({
        ...card,
        id: (parseInt(card.id) + parseInt(activeCard.id)).toString(),
        hidden: true,
      }));
      setStackCards(newStackCards);
      setActiveCard(newStackCards[newStackCards.length - 1]);
    } else {
      setActiveCard(stackCards[stackCards.length - 1]);
    }
  }, [activeCard, deckCards, isRightAnswer, stackCards, initialCards]);

  return {
    deckCards,
    setDeckCards,
    stackCards,
    setStackCards,
    activeCard,
    setActiveCard,
    nextTurn,
  };
}

// Memoized card component to reduce renders
const MemoizedCardInDeck = React.memo(CardInDeck, (prevProps, nextProps) => {
  // Only re-render if these specific props change
  return (
    prevProps.card.id === nextProps.card.id &&
    prevProps.card.hidden === nextProps.card.hidden &&
    prevProps.isGapBefore === nextProps.isGapBefore &&
    prevProps.isGapAfter === nextProps.isGapAfter &&
    prevProps.isDragging === nextProps.isDragging &&
    prevProps.numberOfCards === nextProps.numberOfCards
  );
});

export default function GamePage() {
  const [{ playerCards, cards }] = useStateProvider();
  const [players] = useState([0, 1, 2]);
  const [activePlayer, setActivePlayer] = useState(0);

  // Use custom hooks to organize logic
  const {
    deckCards,
    setDeckCards,
    stackCards,
    setStackCards,
    activeCard,
    nextTurn,
  } = useGameLogic(playerCards, cards);

  const {
    isDragging,
    dragPosition,
    gapIndex,
    handleMouseDown,
    handleDeckGapDetection,
    setGapIndex,
  } = useDragAndDrop(
    activeCard,
    deckCards,
    stackCards,
    setDeckCards,
    setStackCards
  );

  // Memoize player components to prevent unnecessary re-renders
  const playerComponents = useMemo(
    () =>
      players.map((player, index) => (
        <PlayerInGame key={index} isActivePlayer={activePlayer === index} />
      )),
    [players, activePlayer]
  );

  const playerCardsRef = useRef<HTMLDivElement | null>(null);

  // Memoize deck card components
  const deckCardComponents = useMemo(
    () =>
      deckCards.map((card, index) => (
        <MemoizedCardInDeck
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
          handleMouseDown={(e) =>
            handleMouseDown(e, index, deckCards, setDeckCards, card)
          }
          setDeckCards={setDeckCards}
          setGapIndex={setGapIndex}
        />
      )),
    [
      deckCards,
      gapIndex,
      isDragging,
      handleDeckGapDetection,
      handleMouseDown,
      setDeckCards,
      setGapIndex,
    ]
  );

  // Memoize stack card components
  const stackCardComponents = useMemo(
    () =>
      stackCards.map((card, index) => (
        <CardInStack
          key={card.id}
          index={index}
          card={card}
          stackCards={stackCards}
          setStackCards={setStackCards}
          handleMouseDown={(e) =>
            handleMouseDown(e, index, stackCards, setStackCards, card)
          }
        />
      )),
    [stackCards, handleMouseDown, setStackCards]
  );

  // Use CSS hardware acceleration
  const dragCardStyle = useMemo(
    () => ({
      transform: `translate3d(${dragPosition.x}px, ${dragPosition.y}px, 0)`,
      willChange: "transform",
    }),
    [dragPosition]
  );

  return (
    <Container>
      <Menu>
        <button onClick={nextTurn}>Next Turn</button>
      </Menu>

      {isDragging && activeCard && (
        <DraggableCard
          dragPosition={dragPosition}
          // style={dragCardStyle}
        />
      )}

      <Board>
        <Players>{playerComponents}</Players>
        <Stack>{stackCardComponents}</Stack>
        <PlayerCardsInPlay ref={playerCardsRef}>{deckCardComponents}</PlayerCardsInPlay>
      </Board>

      <Deck>
        <PlayerCards>{deckCardComponents}</PlayerCards>
      </Deck>
    </Container>
  );
}

// Styled components remain the same
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
