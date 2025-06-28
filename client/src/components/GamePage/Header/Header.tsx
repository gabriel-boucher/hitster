import styled from "styled-components";
import PlayerBar from "./PlayerBar";

interface PlayerProps {
    setHoveredPlayerId: (playerId: string) => void
    setIsClickedPlayer: (isClicked: boolean) => void
  } 

export default function Header({ setHoveredPlayerId, setIsClickedPlayer }: PlayerProps) {
  return (
      <Container>
        <PlayerBar setHoveredPlayerId={setHoveredPlayerId} setIsClickedPlayer={setIsClickedPlayer} />
      </Container>
  );
}

const Container = styled.div`
  height: 10vh;
`;

