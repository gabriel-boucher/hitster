import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";

interface GapProps {
  index: number;
}

export default function Gap({ index }: GapProps) {
  const [{ openedGapIndex }] = useStateProvider();

  return (
    <Container
      style={{
        width: openedGapIndex === index ? "calc-size(auto,size)" : "0px",
      }}
    >
      <div
        className="card-container"
        style={{
          border: openedGapIndex === index ? "1px solid white" : "0px",
        }}
      ></div>
    </Container>
  );
}

const Container = styled.div`
  aspect-ratio: 1/1;
  height: 100%;

  flex-shrink: 1;
  min-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: width 0.3s ease;

  .card-container {
    aspect-ratio: 1/1;
    width: 80%;

    display: flex;
    justify-content: center;
    align-content: center;

    position: relative;

    border-radius: 5%;

    background-repeat: no-repeat;
    background-size: cover;

    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    transition: width 0.3s ease;
    cursor: pointer;
  }
`;
