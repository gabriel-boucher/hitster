import styled from "styled-components";

// card-in-hand
// card-in-hand-turned
// card-in-play
export default function Token() {

    return (
      <Container>
        <div className="token-container" style={{backgroundImage: `url(src/assets/hitster_logo_square.webp)`}}>
        </div>
      </Container>
    )
  }

const Container = styled.div`
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
        width: 80%;

        display: flex;
        justify-content: center;
        align-content: center;

        position: relative;

        border-radius: 50%;

        background-repeat: no-repeat;
        background-size: cover;

        font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
        transition: width 0.3s ease;
        cursor: pointer;
    }

    &:hover {
        .token-container {
            width: 90%;
            outline: 1px solid yellow;
        }
    }

`
  