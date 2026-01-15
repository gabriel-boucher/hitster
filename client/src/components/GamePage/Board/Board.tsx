import { CardInterface } from "@shared/interfaces";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";
import StackCards from "./StackCards";
import Button from "src/components/elements/Button";
import Next from "src/components/icons/Next";
import { socketEvents } from "@shared/constants";
import { JSX } from "react";
import { getActivePlayerId } from "@shared/utils";
import PlayerBar from "./PlayerBar";
import SpotifyPlayer from "../SpotifyPlayer/SpotifyPlayer";

interface Props {
  setHoveredPlayerId: (playerId: string) => void;
  setIsClickedPlayer: (isClicked: boolean) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
  activePlayerItemsComponent: JSX.Element;
}

export default function Board({
  setHoveredPlayerId,
  setIsClickedPlayer,
  handleMouseDown,
  handleMouseLeave,
  activePlayerItemsComponent,
}: Props) {
  const [{ socket, gameStatus, players, items }] = useStateProvider();

  function handleNextTurn() {
    socket.emit(socketEvents.NEXT_TURN, {
      gameState: gameStatus,
      players,
      items,
    });
  }

  return (
    <Container>
      <PlayerBar
        setHoveredPlayerId={setHoveredPlayerId}
        setIsClickedPlayer={setIsClickedPlayer}
      />
      {socket.id === getActivePlayerId(players) ? (
        <>
          <Center>
            <StackCards
              handleMouseDown={handleMouseDown}
              handleMouseLeave={handleMouseLeave}
            />
            <SpotifyPlayer />
          </Center>
          <NextButton>
            <Button iconComponent={Next()} handleClick={handleNextTurn} />
          </NextButton>
        </>
      ) : (
        <>
          {activePlayerItemsComponent}
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
