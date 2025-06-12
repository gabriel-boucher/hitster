import styled from "styled-components";
import { useMemo } from "react";
import PlayerInGame from "./PlayerInGame";
import { useStateProvider } from "../../../utils/StateProvider";

interface PlayerProps {
  setClickedPlayerId: (playerId: string) => void
} 

export default function PlayerBar({ setClickedPlayerId }: PlayerProps) {
  const [{ players, activePlayer }] = useStateProvider();

  return useMemo(
    () => (
      <Players>
        {Object.values(players).map((player) => (
          <PlayerInGame key={player.socketId} playerId={player.socketId} isActivePlayer={activePlayer.socketId === player.socketId} setClickedPlayerId={setClickedPlayerId}/>
        ))}
      </Players>
    ),
    [players, activePlayer, setClickedPlayerId]
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
