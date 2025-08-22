import { PlayerInterface } from "@shared/interfaces";
import { isCard, isToken } from "@shared/utils";
import { PINK_COLOR__HEX, WHITE_COLOR__HEX } from "src/utils/constants";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";

interface PlayerProps {
  player: PlayerInterface;
  setHoveredPlayerId: (playerId: string) => void;
  setIsClickedPlayer: (isClicked: boolean) => void;
}

export default function PlayerInGame({
  player,
  setHoveredPlayerId,
  setIsClickedPlayer,
}: PlayerProps) {
  const [{ socket, items }] = useStateProvider();

  const handleMouseClick = () => {
    setIsClickedPlayer(true);
  };

  const handleMouseOver = () => {
    setHoveredPlayerId(player.socketId);
  };

  const handleMouseLeave = () => {
    setHoveredPlayerId(socket.id!);
    setIsClickedPlayer(false);
  };

  return (
    <Container>
      <PlayerIcon
        $isActivePlayer={player.active}
        $playerImage={player.image}
        onClick={handleMouseClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
      <PlayerInfo>
        <PlayerName>{player.name}</PlayerName>
        <PlayerScoresContainer>
          <PlayerScores>
            <CardIcon />
            {
              items.filter(
                (item) =>
                  isCard(item) &&
                  item.playerId === player.socketId &&
                  !item.active
              ).length
            }
          </PlayerScores>
          <PlayerScores>
            <TokenIcon />
            {
              items.filter(
                (item) => isToken(item) && item.playerId === player.socketId
              ).length
            }
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
  width: 4vh;
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
  width: 15vh;
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
