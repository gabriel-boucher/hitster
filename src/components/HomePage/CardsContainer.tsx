import React, { ReactElement, useEffect, useState } from "react";
import Card from "./Card";
import Gap from "./Gap";

interface CardData {
  id: number;
  title: string;
}

const CardsContainer: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
    { id: 3, title: "Card 3" },
  ]);
  const [cardsContainer, setCardsContainer] = useState<ReactElement[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredGap, setHoveredGap] = useState<number | null>(null);

  // function showGap(index: number, side: string) {
  //   const newCardsContainer = [...cardsContainer];

  //   if (side === "left") {
  //     index--;
  //   }

  //   newCardsContainer[index];
  // }


  const addCardBetween = (index: number) => {
    const newCard: CardData = {
      id: Date.now(), // Unique ID
      title: `Card X`,
    };

    const newCards = [...cards];
    newCards.splice(index, 0, newCard);
    setCards(newCards);
  };

  function displayCards() {
    const newCardsContainer: ReactElement[] = [];
    newCardsContainer.push(
      <div style={{ display: "flex", height: "100px" }}>
          <Gap
            index={0}
            hoveredCard={hoveredCard}
            hoveredGap={hoveredGap}
            onHover={setHoveredGap}
            addCardBetween={addCardBetween}
          />
        </div>
    )
    cards.map((card, index) => {
      newCardsContainer.push(
        <div key={index+1} style={{ display: "flex", height: "100px" }}>
          <Card index={index+1} title={card.title} onHover={setHoveredCard} />
          <Gap
            index={index+1}
            hoveredCard={hoveredCard}
            hoveredGap={hoveredGap}
            onHover={setHoveredGap}
            addCardBetween={addCardBetween}
          />
        </div>
      );
    });
    setCardsContainer(newCardsContainer);
  }

  useEffect(() => {
    displayCards();
  }, [cards,hoveredCard, hoveredGap]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(0, 255, 179)",
        height: "100px",
      }}
    >
      {cardsContainer}
    </div>
  );
};

export default CardsContainer;
