import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import TokenInDeck from "./TokenInDeck";
import { useMemo } from "react";

export default function PlayerTokens() {
  const [{ activePlayer, tokens }] = useStateProvider();

  return useMemo(
    () => (
      <PlayerTokensContainer>
        {tokens
          .filter((token) => token.playerId === activePlayer.socketId)
          .map((token) => (
            <TokenInDeck key={token.id} />
          ))}
      </PlayerTokensContainer>
    ),
    [activePlayer, tokens]
  );
}

const PlayerTokensContainer = styled.div`
  height: 100%;
  max-width: 20%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: blue;
  padding-left: 1%;
  padding-right: 1%;
`;
