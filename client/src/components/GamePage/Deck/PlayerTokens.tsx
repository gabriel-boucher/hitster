import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import { isToken } from "@shared/utils";
import TokenInDeck from "../../elements/Token/TokenInDeck";
import { useMemo } from "react";

export default function PlayerTokens() {
  const [{ socket, items }] = useStateProvider();

  const playerTokens = useMemo(
    () =>
      items
        .filter((item) => isToken(item))
        .filter(
          (token) =>
            token.playerId === socket.id &&
            token.activePlayerId === null
        ),
    [items, socket]
  );

  return (
    <PlayerTokensContainer>
      {playerTokens.map((token) => (
        <TokenInDeck key={token.id} numberOfTokens={playerTokens.length} />
      ))}
    </PlayerTokensContainer>
  );
}

const PlayerTokensContainer = styled.div`
  height: 20vh;
  max-width: 5%;
  width: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-left: 1%;
  padding-right: 1%;
`;
