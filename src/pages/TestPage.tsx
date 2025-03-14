import styled from "styled-components";
import { useState, useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { CardInterface } from "../utils/Interfaces";
import CardInDeck from "../components/GamePage/Board/CardInDeck";
import CardInStack from "../components/GamePage/Board/CardInStack";
import DraggableCard from "../components/GamePage/Board/DraggableCard";

export default function TestPage() {
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
  };

  const handleMouseDown = (
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
      <Menu>
        <button onClick={nextTurn}>Next Turn</button>
      </Menu>
      {isDragging && <DraggableCard dragPosition={dragPosition} />}
      <Board>
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
      </Board>
      <Deck>
        <PlayerCards>
          <div id="cards-container">
            {deckCards.map((card, index) => (
              <CardInDeck
                key={card.id}
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
          </div>
        </PlayerCards>
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

  #cards-container {
    height: 100%;
    width: 96%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
`;

const Board = styled.div`
  height: 70vh;
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

const Menu = styled.div`
  height: 10vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px 0px 20px;
`;

const Container = styled.div`
`;
