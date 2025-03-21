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

// Performance optimized drag and drop hook
function useDragAndDrop(
  activeCard: CardInterface | null,
  setDeckCards: Dispatch<SetStateAction<CardInterface[]>>,
  setStackCards: Dispatch<SetStateAction<CardInterface[]>>
) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState<DragPosition>({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState<DragPosition>({ x: 0, y: 0 });
  const [gapIndex, setGapIndex] = useState<number | null>(null);

  // Refs for performance optimization
  const rafId = useRef<number | null>(null);
  const isDraggingRef = useRef(isDragging);
  const gapIndexRef = useRef(gapIndex);
  const activeCardRef = useRef(activeCard);
  
  // Update refs when state changes
  useEffect(() => {
    isDraggingRef.current = isDragging;
    gapIndexRef.current = gapIndex;
    activeCardRef.current = activeCard;
  }, [isDragging, gapIndex, activeCard]);

  // Optimized mouse move handler with debouncing
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    
    // Cancel any existing animation frame
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }
    
    // Schedule the position update for the next frame
    rafId.current = requestAnimationFrame(() => {
      setDragPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
      rafId.current = null;
    });
  }, [dragOffset]);

  // Optimized mouse up handler
  const handleMouseUp = useCallback(() => {
    if (!isDraggingRef.current || !activeCardRef.current) return;
    
    // Cancel any existing animation frame
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    
    // Batch state updates before layout calculation
    const currentGapIndex = gapIndexRef.current;
    const currentActiveCard = activeCardRef.current;
    
    // Use a single animation frame for all updates
    requestAnimationFrame(() => {
      if (currentGapIndex !== null) {
        setDeckCards(prevDeckCards => {
          const newDeckCards = [...prevDeckCards];
          newDeckCards.splice(currentGapIndex, 0, currentActiveCard);
          return newDeckCards;
        });
      } else {
        setStackCards(prevStackCards => [...prevStackCards, currentActiveCard]);
      }
      
      // Reset drag state
      setGapIndex(null);
      setIsDragging(false);
      setDragPosition({ x: 0, y: 0 });
    });
  }, [setDeckCards, setStackCards]);

  // Memoized gap detection 
  const handleDeckGapDetection = useCallback((e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
    if (!isDraggingRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const newGapIndex = mouseX < rect.width / 2 ? cardIndex : cardIndex + 1;
    
    // Only update if necessary
    if (gapIndexRef.current !== newGapIndex) {
      setGapIndex(newGapIndex);
    }
  }, []);

  // Optimized mouse down handler
  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      card: CardInterface,
      sourceArray: CardInterface[],
      setSourceArray: Dispatch<SetStateAction<CardInterface[]>>
    ) => {
      if (!activeCardRef.current || e.currentTarget.id !== activeCardRef.current.id) return;
      
      // Prevent default and stop propagation
      e.preventDefault();
      e.stopPropagation();
      
      const rect = e.currentTarget.getBoundingClientRect();
      
      // Set offset and position in one batch update
      requestAnimationFrame(() => {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        
        setDragPosition({
          x: e.clientX - (e.clientX - rect.left),
          y: e.clientY - (e.clientY - rect.top),
        });
        
        setSourceArray(prevArray => 
          prevArray.filter(c => c.id !== card.id)
        );
        
        setIsDragging(true);
      });
    },
    []
  );

  // Add and remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
        
        if (rafId.current) {
          cancelAnimationFrame(rafId.current);
          rafId.current = null;
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

// Super-optimized CardInDeck component with memoization
const MemoizedCardInDeck = React.memo(
  CardInDeck,
  (prevProps, nextProps) => {
    // Only re-render if these specific props change
    return (
      prevProps.card.id === nextProps.card.id &&
      prevProps.card.hidden === nextProps.card.hidden &&
      prevProps.isGapBefore === nextProps.isGapBefore &&
      prevProps.isGapAfter === nextProps.isGapAfter &&
      prevProps.isDragging === nextProps.isDragging
    );
  }
);

export default function HighPerformanceGamePage() {
  const [{ playerCards, cards }] = useStateProvider();
  
  // Game state
  const [deckCards, setDeckCards] = useState<CardInterface[]>(playerCards);
  const [stackCards, setStackCards] = useState<CardInterface[]>(cards);
  const [activeCard, setActiveCard] = useState<CardInterface | null>(
    stackCards.length > 0 ? stackCards[stackCards.length - 1] : null
  );
  
  // UI state
  const [players] = useState([0, 1, 2]);
  const [activePlayer, setActivePlayer] = useState(0);
  const playerCardsRef = useRef<HTMLDivElement | null>(null);
  
  // Cache dimensions to avoid layout thrashing
  const [cardDimensions, setCardDimensions] = useState({ width: 0, height: 0 });
  
  // Use optimized drag and drop hook
  const {
    isDragging,
    dragPosition,
    gapIndex,
    handleMouseDown,
    handleDeckGapDetection,
    setGapIndex,
  } = useDragAndDrop(activeCard, setDeckCards, setStackCards);
  
  // Update card dimensions when container resizes
  useEffect(() => {
    if (!playerCardsRef.current) return;
    
    const updateDimensions = () => {
      if (playerCardsRef.current) {
        setCardDimensions({
          width: playerCardsRef.current.offsetWidth / Math.max(deckCards.length, 1),
          height: playerCardsRef.current.offsetHeight
        });
      }
    };
    
    // Initial dimensions
    updateDimensions();
    
    // Set up resize observer
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(playerCardsRef.current);
    
    return () => {
      if (playerCardsRef.current) {
        resizeObserver.unobserve(playerCardsRef.current);
      }
    };
  }, [deckCards.length]);
  
  // Game logic
  const nextTurn = useCallback(() => {
    if (!activeCard) return;
    
    // Find the card in the deck
    const index = deckCards.findIndex(card => card.id === activeCard.id);
    
    if (index !== -1) {
      // Update visibility
      setDeckCards(prevCards => {
        const newCards = [...prevCards];
        newCards[index] = { ...newCards[index], hidden: false };
        return newCards;
      });
      
      // Check if answer is correct
      const active = parseInt(activeCard.date);
      const before = index > 0 ? parseInt(deckCards[index - 1].date) : -Infinity;
      const after = index < deckCards.length - 1 ? parseInt(deckCards[index + 1].date) : Infinity;
      const isCorrect = before <= active && active <= after;
      
      if (!isCorrect) {
        // Remove card if answer is incorrect
        setTimeout(() => {
          setDeckCards(prevCards => {
            const newCards = [...prevCards];
            newCards.splice(index, 1);
            return newCards;
          });
        }, 1000);
      }
    }
    
    // Update active card
    if (stackCards.length < 1) {
      // Replenish stack if needed
      const newStackCards = cards.map(card => ({
        ...card,
        id: activeCard ? (parseInt(card.id) + parseInt(activeCard.id)).toString() : card.id,
        hidden: true,
      }));
      
      setStackCards(newStackCards);
      setActiveCard(newStackCards[newStackCards.length - 1]);
    } else {
      // Move to next card in stack
      setActiveCard(stackCards[stackCards.length - 1]);
    }
  }, [activeCard, deckCards, stackCards, cards]);
  
  // Memoized components
  const playersComponent = useMemo(
    () => (
      <Players>
        {players.map((_, index) => (
          <PlayerInGame key={index} isActivePlayer={activePlayer === index} />
        ))}
      </Players>
    ),
    [players, activePlayer]
  );
  
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
            handleMouseDown={(e) => 
              handleMouseDown(e, card, stackCards, setStackCards)
            }
          />
        ))}
      </Stack>
    ),
    [stackCards, handleMouseDown]
  );
  
  // Single shared instance of the deck cards component
  const deckCardsComponent = useMemo(
    () => deckCards.map((card, index) => (
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
          handleMouseDown(e, card, deckCards, setDeckCards)
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
    ]
  );
  
  // CSS hardware-accelerated draggable card
  const draggableCardStyle = useMemo(
    () => ({
      transform: `translate3d(${dragPosition.x}px, ${dragPosition.y}px, 0)`,
      willChange: 'transform',
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 1000
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
          />
      )}
      
      <Board>
        {playersComponent}
        {stackComponent}
        <PlayerCardsInPlay ref={playerCardsRef}>
          {deckCardsComponent}
        </PlayerCardsInPlay>
      </Board>
      
      <Deck>
        <PlayerCards>
          {/* Use React.Fragment to avoid creating a new instance of the components */}
          {React.Children.map(deckCardsComponent, child => 
            React.cloneElement(child as React.ReactElement)
          )}
        </PlayerCards>
      </Deck>
    </Container>
  );
}

// Styled components remain the same...
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