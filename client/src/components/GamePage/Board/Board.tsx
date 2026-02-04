import styled from "styled-components";
import StackCards from "./StackCards";
import Button from "src/components/elements/Button";
import Next from "src/components/icons/Next";
import PlayerBar from "./PlayerBar";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {PlayerId} from "../../../type/player/Player.ts";
import ActivePlayerItems from "../ActiveItems/ActivePlayerItems.tsx";
import useNextTurn from "../../../hooks/socket/game/useNextTurn.ts";

interface Props {
  setHoveredPlayerId: (playerId: PlayerId) => void;
  setIsClickedPlayer: (isClicked: boolean) => void;
}

export default function Board({ setHoveredPlayerId, setIsClickedPlayer }: Props) {
  const [{ playerId }] = useConnectionStateProvider();
  const [{ currentPlayerId }] = useGameStateProvider();

  const nextTurn = useNextTurn();

  return (
    <Container>
      <PlayerBar
        setHoveredPlayerId={setHoveredPlayerId}
        setIsClickedPlayer={setIsClickedPlayer}
      />
      {playerId === currentPlayerId ? (
        <>
          <Center>
            <StackCards />
            <SpotifyPlayer />
          </Center>
          <NextButton>
            <Button iconComponent={Next()} handleClick={nextTurn} />
          </NextButton>
        </>
      ) : (
        <>
          <ActivePlayerItems />
          <Filler />
        </>
      )}
    </Container>
  );
}

const Filler = styled.div`
  width: 22vh;
`

const NextButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 7vh;
  width: 22vh;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 12vh;
  height: 100%;
  margin-top: 2vh;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2vh;
  margin: 1vw;
`;
