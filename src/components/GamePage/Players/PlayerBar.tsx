import styled from "styled-components";
import { useMemo } from "react";
import PlayerInGame from "./PlayerInGame";
import { useStateProvider } from "../../../utils/StateProvider";

export default function PlayerBar() {
  const [{ players, activePlayer }] = useStateProvider();

  return useMemo(
    () => (
      <Players>
        {Object.values(players).map((player) => (
          <PlayerInGame key={player.socketId} isActivePlayer={activePlayer === player.socketId} />
        ))}
      </Players>
    ),
    [players, activePlayer]
  );
}

const Players = styled.div`
  position: absolute;
  top: 10vh;
  height: 10%;
  max-width: 20%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: blue;
  padding-left: 1%;
  padding-right: 1%;
`;
