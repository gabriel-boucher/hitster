import styled from "styled-components";
import Menu from "../components/GamePage/Menu/Menu";
import Board from "../components/GamePage/Board/Board";
import Deck from "../components/GamePage/Deck/Deck";

export default function GamePage() {
  // move board events here

  return (
    <Container>
      <Menu/>
      <Board/>
      <Deck/>
    </Container>
  );
}

const Container = styled.div`
  background-color: rgb(0, 18, 51);
`;
