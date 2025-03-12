import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { CardInterface } from "../utils/Interfaces";
import CardInDeck from "../components/GamePage/Board/CardInDeck";
import CardInStack from "../components/GamePage/Board/CardInStack";
import DraggableCard from "../components/GamePage/Board/DraggableCard";

export default function TestPage() {
  const [{ playerCards, cards }] = useStateProvider();

  const [deckCards, setDeckCards] = useState<CardInterface[]>(playerCards);
  const [stackCards, setStackCards] = useState<CardInterface[]>(cards);
  const [gapIndex, setGapIndex] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<CardInterface | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setDragPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (gapIndex !== null) {
        // card dropped in the deck
        const newDeckCards = [...deckCards];
        newDeckCards.splice(gapIndex, 0, activeCard!);
        setDeckCards(newDeckCards);
      } else {
        // card returns to the stack
        const newStackCards = [...stackCards];
        newStackCards.push(activeCard!);
        setStackCards(newStackCards);
      }
      setGapIndex(null);
      setIsDragging(false);
      setActiveCard(null);

      setDragPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number,
    cards: CardInterface[],
    setCards: (cards: CardInterface[]) => void
  ) => {
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
    const [card] = newCards.splice(index, 1);
    setCards(newCards);
    
    setIsDragging(true);
    setActiveCard(card);
  };

  const handleDeckGapDetection = (
    e: React.MouseEvent<HTMLDivElement>,
    cardIndex: number
  ) => {
    if (isDragging) {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      setGapIndex(mouseX < rect.width / 2 ? cardIndex : cardIndex + 1);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, gapIndex]);

  return (
    <Container>
      {isDragging && <DraggableCard dragPosition={dragPosition} />}
      <Stack>
        {stackCards.map((_, index) => (
          <CardInStack
            key={index}
            index={index}
            stackCards={stackCards}
            setStackCards={setStackCards}
            handleMouseDown={handleMouseDown}
          />
        ))}
      </Stack>
      <Deck>
        {deckCards.map((card, index) => (
          <CardInDeck
            key={index}
            index={index}
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
      </Deck>
    </Container>
  );
}

const Deck = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #030353;
  user-select: none;
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
