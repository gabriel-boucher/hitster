import styled from "styled-components";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import {Token} from "../../../type/item/Token.ts";

export default function TokenInDeck({ token }: { token: Token }) {
    const style = {
        opacity: token.status === ItemStatus.MOVING_IN_CURRENT_DECK ? 0.3 : 1,
        border: token.status === ItemStatus.MOVING_IN_CURRENT_DECK ? "2px solid white" : "none",
    };

  return (
    <Container>
      <TokenComponent style={style}/>
    </Container>
  );
}

const TokenComponent = styled.div`
    aspect-ratio: 1/1;
    height: 80%;

    display: flex;
    justify-content: center;
    align-content: center;

    border-radius: 50%;

    background-image: url("src/assets/hitster_logo_square.webp");
    background-repeat: no-repeat;
    background-size: cover;
`;

const Container = styled.div`
  aspect-ratio: 1/1;
  height: 100%;
  width: auto;

  flex-shrink: 1;
  min-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;
