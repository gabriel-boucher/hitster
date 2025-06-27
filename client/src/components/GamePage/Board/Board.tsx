import { CardInterface } from "@shared/Interfaces";
import { useStateProvider } from "src/utils/StateProvider";
import styled from "styled-components";
import StackCards from "./StackCards";
import Button from "src/components/elements/Button";
import Next from "src/components/icons/Next";
import { socketEvents } from "@shared/Constants";
import { JSX } from "react";

interface Props {
    handleMouseDown: (e: React.MouseEvent<HTMLDivElement>, card: CardInterface) => void;
    handleMouseLeave: () => void;
    activePlayerItemsComponent: JSX.Element;
}

export default function Board({ handleMouseDown, handleMouseLeave, activePlayerItemsComponent }: Props) {
    const [{ socket, gameState, players, activePlayer, items, activeCard, }] = useStateProvider();

    function handleNextTurn() {
        socket.emit(socketEvents.NEXT_TURN, {
          gameState,
          players,
          activePlayer,
          items,
          activeCard,
        });
      }

  return (
      <Container>
        {socket.id === activePlayer.socketId ? (
            <>
              <StackCards handleMouseDown={handleMouseDown} handleMouseLeave={handleMouseLeave}/>
              <NextButton>
                <Button iconComponent={Next()} handleClick={handleNextTurn} />
              </NextButton>
            </>
          ) : (
            activePlayerItemsComponent
          )}
      </Container>
  );
}

const NextButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 1vh;
  position: absolute;
  right: 3vw;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

