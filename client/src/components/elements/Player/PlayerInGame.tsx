import {PINK_COLOR__HEX, WHITE_COLOR__HEX} from "src/utils/constants";
import styled from "styled-components";
import {Player} from "../../../type/player/Player.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";

interface PlayerProps {
  player: Player;
  setHoveredPlayerId: (playerId: string) => void;
  setIsClickedPlayer: (isClicked: boolean) => void;
}

export default function PlayerInGame({
  player,
  setHoveredPlayerId,
  setIsClickedPlayer,
}: PlayerProps) {
  const [{ socket }] = useConnectionStateProvider();
  const [{ currentPlayerId }] = useGameStateProvider();

  const handleMouseClick = () => {
    setIsClickedPlayer(true);
  };

  const handleMouseOver = () => {
    setHoveredPlayerId(player.id);
  };

  const handleMouseLeave = () => {
    setHoveredPlayerId(socket.id!);
    setIsClickedPlayer(false);
  };

  return (
    <Container>
      <PlayerIcon
        $isActivePlayer={player.id === currentPlayerId}
        $playerImage={player.color}
        onClick={handleMouseClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
      <PlayerInfo>
        <PlayerName>{player.name}</PlayerName>
        <PlayerScoresContainer>
          <PlayerScores>
            <CardIcon />
            {player.deck.cards.length}
          </PlayerScores>
          <PlayerScores>
            <TokenIcon />
            {player.deck.tokens.filter(token => token.status !== ItemStatus.USED).length}
          </PlayerScores>
        </PlayerScoresContainer>
      </PlayerInfo>
    </Container>
  );
}

const CardIcon = styled.div`
  aspect-ratio: 1/1;
  width: 0.75rem;
  border: 1px solid ${WHITE_COLOR__HEX};
  border-radius: 20%;
`;

const TokenIcon = styled.div`
  aspect-ratio: 1/1;
  width: 0.75rem;
  border: 1px solid ${WHITE_COLOR__HEX};
  border-radius: 50%;
`;

const PlayerScores = styled.div`
  display: flex;
  gap: 0.5vh;
  line-height: 0.75rem;
  font-size: 0.75rem;
  font-weight: normal;
`;

const PlayerScoresContainer = styled.div`
  display: flex;
  gap: 1vh;
`;

const PlayerName = styled.div`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5vh;
  color: ${WHITE_COLOR__HEX};
  line-height: 1.5rem;
`;

const PlayerIcon = styled.div<{
  $isActivePlayer: boolean;
  $playerImage: string;
}>`
  aspect-ratio: 1/1;
  width: 6vh;
  flex-shrink: 0;

  border-radius: 50%;
  border: 0.4vh solid
    ${({ $isActivePlayer }) =>
      $isActivePlayer ? WHITE_COLOR__HEX : "transparent"};
  box-shadow: 0 0 0.2rem
      ${({ $isActivePlayer }) =>
        $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    0 0 0.5rem
      ${({ $isActivePlayer }) =>
        $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    0 0 1rem
      ${({ $isActivePlayer }) =>
        $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    inset 0 0 0.2rem
      ${({ $isActivePlayer }) =>
        $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    inset 0 0 0.5rem
      ${({ $isActivePlayer }) =>
        $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    inset 0 0 1rem
      ${({ $isActivePlayer }) =>
        $isActivePlayer ? PINK_COLOR__HEX : "transparent"};

  /* background-image: url(${({ $playerImage }) => $playerImage}); */
  background-color: ${({ $playerImage }) => $playerImage};
  background-repeat: no-repeat;
  background-size: cover;

  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  transition: width 0.3s ease;
  cursor: pointer;

  &:hover {
    border: 0.4vh solid white;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5vh;

  border-radius: 50%;

  /* &:hover ${PlayerInfo} {
    overflow: visible;
    overflow-wrap: break-word;
    text-overflow: unset;
    white-space: normal;
  }	 */
`;
