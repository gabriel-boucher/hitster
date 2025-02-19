import styled from "styled-components";
import Card from "./Card";
import { ReactElement, useState } from "react";
import { CardInterface } from "../../../Interfaces";

export default function PlayerCards({initialCard}: {initialCard: CardInterface}) {
  const [cards, setCards] = useState<CardInterface[]>([initialCard]);

  const cardsContainer: ReactElement[] = [];
  cards.map((card) => {
    card.inHand = true;
    cardsContainer.push(
      <Card key={card.song}
        card={card}
      />
    );
  });

  return (
    <Container>
      <div className="cards-container">{cardsContainer}</div>
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
