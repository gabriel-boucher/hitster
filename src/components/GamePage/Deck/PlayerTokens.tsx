import styled from "styled-components";

import Token from "./Token"
import { ReactElement, useEffect, useState } from "react";
import { useStateProvider } from "../../../utils/StateProvider";

export default function PlayerTokens() {
  const [{ players }] = useStateProvider();
  const [tokensContainer, setTokensContainer] = useState<ReactElement[]>([]);

  function displayTokens() {
    const newTokensContainer: ReactElement[] = [];

    for (let token = 0; token < players[0].tokens; token++) {
      newTokensContainer.push(<Token key={token}/>)
    }

    setTokensContainer(newTokensContainer);
  }

  useEffect(() => {displayTokens()}, []);


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