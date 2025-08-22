import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import { isToken } from "@shared/utils";
import TokenInDeck from "../../elements/Token/TokenInDeck";
import { TokenInterface } from "@shared/interfaces";

interface TokenProps {
  hoveredPlayerId: string;
}

export default function PlayerTokens({hoveredPlayerId}: TokenProps) {
  const [{ items }] = useStateProvider();

  return (
    <PlayerTokensContainer>
      {items
        .filter(
          (item): item is TokenInterface =>
            isToken(item) && item.playerId === hoveredPlayerId && item.activePlayerId === null
        )
        .map((token) => (
          <TokenInDeck key={token.id}/>
        ))}
    </PlayerTokensContainer>
  );
}

const PlayerTokensContainer = styled.div`
  height: 5vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-left: 1%;
  padding-right: 1%;
`;
