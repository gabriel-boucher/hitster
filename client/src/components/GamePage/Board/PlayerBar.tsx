import styled from "styled-components";
import { useMemo } from "react";
import PlayerInGame from "../../elements/Player/PlayerInGame";
import {useRoomStateProvider} from "../../../stateProvider/room/RoomStateProvider.tsx";
import {PlayerId} from "../../../type/player/Player.ts";

interface PlayerProps {
  setHoveredPlayerId: (playerId: PlayerId) => void
  setIsClickedPlayer: (isClicked: boolean) => void
} 

export default function PlayerBar({ setHoveredPlayerId, setIsClickedPlayer }: PlayerProps) {
  const [{ players }] = useRoomStateProvider();

  return useMemo(
    () => (
      <Container>
        {Object.values(players).map((player) => (
          <PlayerInGame key={player.id} player={player} setHoveredPlayerId={setHoveredPlayerId} setIsClickedPlayer={setIsClickedPlayer}/>
        ))}
      </Container>
    ),
    [players, setHoveredPlayerId, setIsClickedPlayer]
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1vh;
  width: 22vh;
`;
