import styled from "styled-components";
import PlayerCards from "./PlayerCards";
import PlayerTokens from "./PlayerTokens";
import { CardInterface } from "../../../Interfaces";

export default function Deck({ initialCard }: {initialCard: CardInterface}) {

  return (
    <Container id="deck">
        <PlayerCards initialCard={initialCard}/>
        <hr/>
        <PlayerTokens/>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 20vh;
  border-radius: 16px 16px 0px 0px;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 4px 30px hsla(0, 0%, 0%, 10%);
  background: hsla(0, 0%, 100%, 20%);

  hr {
    border: 1px solid hsla(0, 0%, 100%, 50%);
  }
`