
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";

interface PlayerProps {
  playerId: string;
  isActivePlayer: boolean;
  setClickedPlayerId: (playerId: string) => void
}

export default function PlayerInGame({ playerId, isActivePlayer, setClickedPlayerId }: PlayerProps) {
  const [{ socket }] = useStateProvider();
  return (
    <Player>
      <div
        className="player-container"
        style={{
          backgroundImage: `url(src/assets/avatar.webp)`,
          border: isActivePlayer ? "5px solid yellow" : "",
        }}
        onMouseOver={() => setClickedPlayerId(playerId)}
        onMouseLeave={() => setClickedPlayerId(socket.id!)}
      ></div>
    </Player>
  );
}

const Player = styled.div`
  aspect-ratio: 1/1;
  height: 100%;
  width: auto;

  flex-shrink: 1;
  min-width: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  .player-container {
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

    &:hover {
      border: 3px solid white;
    }
  }
`;
