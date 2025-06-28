import styled from "styled-components";
import { useMemo } from "react";
import PlayerInGame from "../../elements/Player/PlayerInGame";
import { useStateProvider } from "../../../utils/StateProvider";

interface PlayerProps {
  setHoveredPlayerId: (playerId: string) => void
  setIsClickedPlayer: (isClicked: boolean) => void
} 

export default function PlayerBar({ setHoveredPlayerId, setIsClickedPlayer }: PlayerProps) {
  const [{ players, activePlayer }] = useStateProvider();

  return useMemo(
    () => (
      <Container>
        {Object.values(players).map((player) => (
          <PlayerInGame key={player.socketId} player={player} isActivePlayer={activePlayer.socketId === player.socketId} setHoveredPlayerId={setHoveredPlayerId} setIsClickedPlayer={setIsClickedPlayer}/>
        ))}
      </Container>
    ),
    [players, activePlayer, setHoveredPlayerId, setIsClickedPlayer]
  );
}

const Container = styled.div`
  height: 11vh;
  display: flex;
  justify-content: left;
  align-items: center;
`;
