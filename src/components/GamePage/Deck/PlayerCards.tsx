import styled from "styled-components";
import Card from "./Card";
import { ReactElement, useEffect, useState } from "react";
import Gap from "./Gap";
import { useStateProvider } from "../../../utils/StateProvider";
import { cardElements, cardStates } from "../../../utils/Constants";

export default function PlayerCards() {
  const [{ playerCards, openedGapIndex }] = useStateProvider();
  const [cardsContainer, setCardsContainer] = useState<ReactElement[]>([]);

  function displayCards() {
    const newCardsContainer: ReactElement[] = [];

    for (let i = 0; i <= 2 * playerCards.length; i++) {
      if (i % 2 === 0) {
        console.log(i, "gap")
        newCardsContainer.push(
          <Gap key={i} index={i} />
      );
      } else {
        console.log(i, "card")
        newCardsContainer.push(
          <Card key={i} card={playerCards[Math.floor(i / 2)]} cardState={cardStates.CARD_IN_HAND} />
        );
      }
    }

    setCardsContainer(newCardsContainer);
  }

  useEffect(() => {
    displayCards();
  }, [playerCards, openedGapIndex]);

  return (
    <Container>
      <div id={cardElements.CARDS_CONTAINER}>{cardsContainer}</div>
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

  #cards-container {
    height: 100%;
    width: 96%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
`;
