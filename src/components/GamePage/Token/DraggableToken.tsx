import styled from "styled-components";

interface TokenProps {
  dragPosition: { x: number; y: number };
}

export default function DraggableToken({ dragPosition }: TokenProps) {
  return (
    <Token
      style={{
        left: dragPosition.x,
        top: dragPosition.y,
        position: "absolute",
        zIndex: "1000",
        pointerEvents: "none",
        willChange: "transform",
      }}
    >
      <div className="token-container"></div>
    </Token>
  );
}

const Token = styled.div`
  height: 16vh;
  width: 16vh;
  user-select: none;

  .token-container {
    height: inherit;
    width: inherit;

    border: 1px solid white;
    border-radius: 5%;

    background-image: url("src/assets/hitster_logo_square.webp");
    background-repeat: no-repeat;
    background-size: cover;

    cursor: grabbing;
  }
`;
