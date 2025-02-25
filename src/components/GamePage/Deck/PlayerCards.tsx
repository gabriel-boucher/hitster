import styled from "styled-components";
import Card from "./Card";
import { ReactElement, useEffect, useState } from "react";
import { CardInterface } from "../../../utils/Interfaces";
import Gap from "./Gap";
import { useStateProvider } from "../../../utils/StateProvider";
import { reducerCases } from "../../../utils/Constants";

export default function PlayerCards() {
  const [{ players }, dispatch] = useStateProvider();
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
    const playerCards = [...players[0].cards];
    playerCards.splice(index, 0, newCard);
    dispatch({ type: reducerCases.SET_PLAYERS, players: [{ ...players[0], cards: playerCards }] });
  };


  function displayCards() {
    const playerCards = [...players[0].cards];
    const newCardsContainer: ReactElement[] = [];

    for (let i = 0; i <= 2*playerCards.length; i++) {
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
            card={playerCards[index]} 
            setOpenedGapIndex={setOpenedGapIndex} 
          />
        )
      }
    }

    setCardsContainer(newCardsContainer);
  }

  useEffect(() => {
    displayCards();
  }, [players, openedGapIndex]);

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