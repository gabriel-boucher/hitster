import styled from "styled-components";

import Token from "./Token"

export default function PlayerTokens() {
  const tokens = 5

  const tokensContainer = []
  for (let token = 0; token < tokens; token++) {
    tokensContainer.push(<Token key={token}/>)
  }

  return (
    <Container>
      <div className="tokens-container">
        {tokensContainer}  
      </div>
    </Container>
  )  
}

const Container = styled.div`
  max-width: 20%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;

  .tokens-container {
    height: 75%;
    width: 96%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
  }
  
`