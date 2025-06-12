import styled from "styled-components";

interface ButtonProps {
    handleNextTurn: () => void
}

export default function NextTurnButton({ handleNextTurn }: ButtonProps) {
    return (
    <Container>
      <NextTurn onClick={handleNextTurn}>
          <div className="glow">
              <img className="chevron-icon" src="https://static.thenounproject.com/png/1025828-200.png" alt="Next turn" />
          </div>
      </NextTurn>
    </Container>
)
}

const NextTurn = styled.button`
  aspect-ratio: 1/1;
  height: 10vh;
  border-radius: 50%;
  border : none;
  padding: 1vh;
  background: hsla(0, 0%, 100%, 20%);
  margin-right: 8vh;


  &:hover {
    cursor: pointer;
  }
  
  .glow {
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 0.4vh solid white;
    box-shadow: 0 0 0.2rem #fe13a4,
                0 0 0.5rem #fe13a4,
                0 0 1rem #fe13a4,
                inset 0 0 0.2rem #fe13a4,
                inset 0 0 0.5rem #fe13a4,
                inset 0 0 1rem #fe13a4;
  }

  .chevron-icon {
    aspect-ratio: 1/1;
    max-width: 80%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    filter: invert(100%);
  }
`;

const Container = styled.div`
  height: 16vh;
  flex: 1;
  display: flex;
  justify-content: right;
  align-items: center;
`;