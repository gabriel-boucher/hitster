import styled from "styled-components";
import Card from "../Deck/Card";
import { ReactElement } from "react";
import { useStateProvider } from "../../../utils/StateProvider";

export default function Board() {
  const [{cards}] = useStateProvider();

  const board: ReactElement[] = [];
  cards.forEach((card) => {
    board.push(
      <Card
        key={card.id}
        card={card}
      />
    );
  });

  return (
    <Container>
      {board}
    </Container>
  );
}

const Container = styled.div`
  height: 70vh;
`;
