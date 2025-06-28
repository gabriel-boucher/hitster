
import { PlayerInterface } from "@shared/Interfaces";
import { PINK_COLOR__HEX, WHITE_COLOR__HEX } from "src/utils/Constants";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";

interface PlayerProps {
  player: PlayerInterface;
  isActivePlayer: boolean;
  setHoveredPlayerId: (playerId: string) => void
  setIsClickedPlayer: (isClicked: boolean) => void
}

export default function PlayerInGame({ player, isActivePlayer, setHoveredPlayerId, setIsClickedPlayer }: PlayerProps) {
  const [{ socket }] = useStateProvider();

  const playerImage = "src/assets/avatar.webp";

  const handleMouseClick = () => {
    setIsClickedPlayer(true);
  }

  const handleMouseOver = () => {
    setHoveredPlayerId(player.socketId);
  }

  const handleMouseLeave = () => {
    setHoveredPlayerId(socket.id!);
    setIsClickedPlayer(false);
  }

  return (
    <Container>
      <PlayerIcon
        $isActivePlayer={isActivePlayer}
        $playerImage={playerImage}
        onClick={handleMouseClick}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      />
      <PlayerInfo>
        {player.name}
      </PlayerInfo>
    </Container>
  );
}

const PlayerInfo = styled.div`
  color: ${WHITE_COLOR__HEX};
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  
  height: 5vh;
  width: 12vh;
`

const PlayerIcon = styled.div<{ $isActivePlayer: boolean, $playerImage: string }>`
  aspect-ratio: 1/1;
  width: 7vh;

  border-radius: 50%;
  border: 0.4vh solid ${({ $isActivePlayer }) =>
    $isActivePlayer ? WHITE_COLOR__HEX : "transparent"};
  box-shadow: 
    0 0 0.2rem ${({ $isActivePlayer }) => $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    0 0 0.5rem ${({ $isActivePlayer }) => $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    0 0 1rem ${({ $isActivePlayer }) => $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    inset 0 0 0.2rem ${({ $isActivePlayer }) => $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    inset 0 0 0.5rem ${({ $isActivePlayer }) => $isActivePlayer ? PINK_COLOR__HEX : "transparent"},
    inset 0 0 1rem ${({ $isActivePlayer }) => $isActivePlayer ? PINK_COLOR__HEX : "transparent"};

  background-image: url(${({$playerImage}) => $playerImage});
  background-repeat: no-repeat;
  background-size: cover;

  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  transition: width 0.3s ease;
  cursor: pointer;

  &:hover {
    border: 3px solid white;
  }
`

const Container = styled.div`
  height: 11vh;

  flex-shrink: 1;
  min-width: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 1vh;

  border-radius: 50%;

  &:hover ${PlayerInfo} {
    overflow: visible;
    overflow-wrap: break-word;
    text-overflow: unset;
    white-space: normal;
  }	
`;