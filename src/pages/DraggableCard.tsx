import styled from "styled-components";

export default function DraggableCard() {
  return (
    <Card>
      <div className="card-container"></div>
    </Card>
  );
}

const Card = styled.div`
  height: 16vh;
  width: 16vh;
  user-select: none;

  .card-container {
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
