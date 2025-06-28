import styled from "styled-components";

export default function TokenInDeck() {
  return (
    <Container>
      <Token />
    </Container>
  );
}

const Token = styled.div`
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
