import { CardInterface } from "@shared/Interfaces";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";
import StackCards from "./StackCards";
import Button from "src/components/elements/Button";
import Next from "src/components/icons/Next";
import { socketEvents } from "@shared/Constants";
import { JSX } from "react";
import { getActivePlayerId } from "@shared/utils";
import PlayerBar from "./PlayerBar";

interface Props {
  setHoveredPlayerId: (playerId: string) => void;
  setIsClickedPlayer: (isClicked: boolean) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
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
  const [{ socket, gameState, players, items }] = useStateProvider();

  function handleNextTurn() {
    socket.emit(socketEvents.NEXT_TURN, {
      gameState,
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
          <StackCards
            handleMouseDown={handleMouseDown}
            handleMouseLeave={handleMouseLeave}
          />
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
  padding-bottom: 1vh;
  width: 22vh;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2vh;
  margin: 1vw;
`;
