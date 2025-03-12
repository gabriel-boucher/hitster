import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { CardInterface } from "../utils/Interfaces";

export default function TestPage() {
  const [{ playerCards, cards }] = useStateProvider();

  const [deckCards, setDeckCards] = useState<CardInterface[]>(playerCards);
  const [gapIndex, setGapIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [stackCards, setStackCards] = useState<CardInterface[]>(cards);
  const [dragSource, setDragSource] = useState<"stack" | "deck" | null>(null);
  const [activeCard, setActiveCard] = useState<CardInterface | null>(null);

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
      setIsDragging(false);
      setDragSource(null);
      setActiveCard(null);

      setGapIndex(null);
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
    setDragSource("deck");
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
  }, [isDragging, dragSource, gapIndex]);

  return (
    <Container>
      <Stack>
        {isDragging && dragSource === "stack" && (
          <DraggableCard
            style={{
              left: dragPosition.x,
              top: dragPosition.y,
              position: "fixed",
              transform: "none",
              zIndex: 1000,
              pointerEvents: "none",
              backgroundImage: `url(${activeCard?.albumCover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {activeCard?.date}
          </DraggableCard>
        )}
        {stackCards.map((card, index) => (
          <CardStack
            key={index}
            onMouseDown={(e) => handleMouseDown(e, index, stackCards, setStackCards)}
            style={{
              backgroundImage: `url(${card.albumCover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              bottom: `${index * 4}px`,
              zIndex: index,
              marginBottom: "40px",
              display: "flex",
              justifyContent: "center",
              color: "red",
            }}
          >
            {card.date}
          </CardStack>
        ))}
      </Stack>
      <Deck>
        {isDragging && dragSource === "deck" && (
          <DraggableCard
            style={{
              left: dragPosition.x,
              top: dragPosition.y,
              position: "fixed",
              transform: "none",
              zIndex: 1000,
              pointerEvents: "none",
              backgroundImage: `url(${activeCard?.albumCover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            {activeCard?.date}
          </DraggableCard>
        )}
        {deckCards.map((card, index) => (
          <CardDeck
            key={index}
            onMouseOver={(e) => handleDeckGapDetection(e, index)} // keeps gap opened
            onMouseMove={(e) => handleDeckGapDetection(e, index)} // opens gap
            onMouseDown={(e) => handleMouseDown(e, index, deckCards, setDeckCards)}
            onMouseLeave={() => setGapIndex(null)}
            $isGapBefore={gapIndex === index}
            $isGapAfter={gapIndex === index + 1}
            $isDragging={isDragging}
            $dragSource={dragSource}
            $numberOfCards={deckCards.length}
            style={{
              backgroundImage: `url(${card.albumCover})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              display: "flex",
              justifyContent: "center",
              color: "red",
            }}
          >
            {card.date}
          </CardDeck>
        ))}
      </Deck>
    </Container>
  );
}

const CardDeck = styled.div<{
  $isGapBefore?: boolean;
  $isGapAfter?: boolean;
  $isDragging: boolean;
  $dragSource: "stack" | "deck" | null;
  $numberOfCards: number;
}>`
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid black;
  cursor: grab;
  user-select: none;
  transition: margin 0.3s ease;
  margin-left: ${(props) => (props.$isGapBefore ? "50px" : "0")};
  margin-right: ${(props) => (props.$isGapAfter ? "50px" : "0")};

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    height: 200%;
    width: 101px;
    z-index: 0;
    pointer-events: ${(props) => (props.$isDragging ? "auto" : "none")};
    opacity: 0.5;
    user-select: none;
  }

  &::before {
    right: 50%;
  }

  &::after {
    left: 50%;
  }

  &:nth-child(
      ${(props) =>
          props.$isDragging && props.$dragSource === "deck" ? "2" : "1"}
    ) {
    &::before {
      width: calc(
        (100vw - (${(props) => props.$numberOfCards} - 1) * 102px) / 2 - 50px
      );
    }
  }

  &:last-child {
    &::after {
      width: calc(
        (100vw - (${(props) => props.$numberOfCards} - 1) * 102px) / 2 - 50px
      );
    }
  }
`;

const CardStack = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid black;
  cursor: grab;
  user-select: none;
  transition: box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const DraggableCard = styled(CardStack)`
  cursor: grabbing;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;

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
