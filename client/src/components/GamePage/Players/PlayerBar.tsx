import styled from "styled-components";
import { useMemo } from "react";
import PlayerInGame from "./PlayerInGame";
import { useStateProvider } from "../../../utils/StateProvider";

interface PlayerProps {
  setHoveredPlayerId: (playerId: string) => void
  setIsClickedPlayer: (isClicked: boolean) => void
} 

export default function PlayerBar({ setHoveredPlayerId, setIsClickedPlayer }: PlayerProps) {
  const [{ players, activePlayer }] = useStateProvider();

  return useMemo(
    () => (
      <Players>
        {Object.values(players).map((player) => (
          <PlayerInGame key={player.socketId} playerId={player.socketId} isActivePlayer={activePlayer.socketId === player.socketId} setHoveredPlayerId={setHoveredPlayerId} setIsClickedPlayer={setIsClickedPlayer}/>
        ))}
      </Players>
    ),
    [players, activePlayer, setHoveredPlayerId, setIsClickedPlayer]
  );
}

const Players = styled.div`
  height: 7vh;
  width: 100vw;
  display: flex;
  justify-content: left;
  align-items: center;
  overflow: hidden;
  margin: 1rem;
  gap: 1rem;
`;
