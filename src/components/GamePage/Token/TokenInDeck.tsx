import styled from "styled-components";

interface TokenProps {
  numberOfTokens: number;
}

export default function TokenInDeck({ numberOfTokens }: TokenProps) {
  return (
    <Token>
      <div
        className="token-container"
        style={{ height: numberOfTokens === 1 ? "48%" : "80%" }}
      />
    </Token>
  );
}

const Token = styled.div`
  aspect-ratio: 1/1;
  height: 100%;
  width: auto;

  flex-shrink: 1;
  min-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  .token-container {
    aspect-ratio: 1/1;

    display: flex;
    justify-content: center;
    align-content: center;

    border-radius: 50%;

    background-image: url("src/assets/hitster_logo_square.webp");
    background-repeat: no-repeat;
    background-size: cover;
  }
`;
