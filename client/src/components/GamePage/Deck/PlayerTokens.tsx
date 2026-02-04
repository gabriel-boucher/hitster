import styled from "styled-components";
import TokenInDeck from "../../elements/Token/TokenInDeck";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";

interface TokenProps {
  hoveredPlayerId: string;
}

export default function PlayerTokens({hoveredPlayerId}: TokenProps) {
  const [{ players }] = useRoomStateProvider();

  return (
    <PlayerTokensContainer>
      {
        players.find((player) => player.id === hoveredPlayerId)?.deck.tokens.map((token) =>(
            (token.status === ItemStatus.MOVING_IN_CURRENT_DECK ||
          token.status === ItemStatus.UNUSED ||
          token.status === ItemStatus.BOARD) &&
          <TokenInDeck key={token.id} token={token}/>
        ))
      }
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
