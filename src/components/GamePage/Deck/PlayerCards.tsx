import styled from "styled-components";
import Card from "./Card";
import { ReactElement, useEffect, useState } from "react";
import { CardInterface } from "../../../Interfaces";
import Gap from "./Gap";

export default function PlayerCards({initialCard}: {initialCard: CardInterface}) {
  const [cards, setCards] = useState<CardInterface[]>([initialCard]);
  const [cardsContainer, setCardsContainer] = useState<ReactElement[]>([]);
  const [openedGapIndex, setOpenedGapIndex] = useState<number | null>(null);

  function addCardBetween(index: number) {
    const newCard: CardInterface = {
      song: "Starlight",
      artist: "Muse",
      date: "2006",
      albumCover:
        "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
      inHand: true,
      hidden: true,
    };

    const newCards = [...cards];
    newCards.splice(index, 0, newCard);
    setCards(newCards);
  };


  function displayCards() {
    const newCardsContainer: ReactElement[] = [];

    for (let i = 0; i <= 2*cards.length; i++) {
      if (i%2 === 0) {
        newCardsContainer.push(
          <Gap
            key={i}
            index={i}
            hoveredGap={openedGapIndex}
            onHover={setOpenedGapIndex}
            addCardBetween={addCardBetween}
          />
        )
      } else {
        const index = Math.floor(i/2)
        newCardsContainer.push(
          <Card 
            key={i} 
            index={i} 
            card={cards[index]} 
            setOpenedGapIndex={setOpenedGapIndex} 
          />
        )
      }
    }

    setCardsContainer(newCardsContainer);
  }

  useEffect(() => {
    displayCards();
  }, [cards, openedGapIndex]);

  return (
    <Container>
      <div className="cards-container">
        {cardsContainer}
      </div>
    </Container>
  );
}

const Container = styled.div`
  max-width: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;

  .cards-container {
    height: 100%;
    width: 96%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
`;