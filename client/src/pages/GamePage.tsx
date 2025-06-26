import styled from "styled-components";
import { useState, useEffect } from "react";
import useMouseHandlers from "../utils/MouseHandlers";
import DraggableCard from "../components/GamePage/Card/DraggableCard";
import PlayerBar from "../components/GamePage/Players/PlayerBar";
import ActivePlayerItems from "../components/GamePage/ActiveItems/ActivePlayerItems";
import PlayerCards from "../components/GamePage/Card/PlayerCards";
import PlayerTokens from "../components/GamePage/Token/PlayerTokens";
import StackCards from "../components/GamePage/Card/StackCards";
import SpotifyPlayer from "src/components/GamePage/SpotifyPlayer/SpotifyPlayer";
import { useStateProvider } from "../utils/StateProvider";
import { NEXT_BUTTON_URL, reducerCases } from "../utils/Constants";
import { isCard } from "@shared/utils";
import { socketEvents } from "@shared/Constants";
import Button from "src/components/elements/Button";

export default function GamePage() {
  const [
    { socket, gameState, players, activePlayer, items, activeCard, isDragging },
    dispatch,
  ] = useStateProvider();
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [activeCardWidth, setActiveCardWidth] = useState(0);
  const [clickedPlayerId, setClickedPlayerId] = useState(socket.id!);

  const {
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleMouseDraggingOver,
    handleMouseOver,
  } = useMouseHandlers(setDragPosition);

  const activePlayerItemsComponent = ActivePlayerItems({
    setActiveCardWidth,
    handleMouseClick,
    handleMouseDown,
    handleMouseLeave,
    handleMouseDraggingOver,
    handleMouseOver,
  });

  function handleNextTurn() {
    socket.emit(socketEvents.NEXT_TURN, {
      gameState,
      players,
      activePlayer,
      items,
      activeCard,
    });
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Otherwise the card movement is fucked
  useEffect(() => {
    dispatch({
      type: reducerCases.SET_ACTIVE_CARD,
      activeCard: items
        .filter((item) => isCard(item))
        .filter((card) => card.id === activeCard.id)[0],
    });
  }, [items, activeCard, dispatch]);

  return (
    <Container>
      <DisableHoverContainer className={isDragging ? "disable-hover" : ""}>
        <Header >
          <PlayerBar setClickedPlayerId={setClickedPlayerId} />
        </Header>
        <Board >
          {socket.id === activePlayer.socketId ? (
            <>
              <StackCards handleMouseDown={handleMouseDown} handleMouseLeave={handleMouseLeave}/>
              <NextButton>
                <Button iconSrc={NEXT_BUTTON_URL} handleClick={handleNextTurn} />
              </NextButton>
            </>
          ) : (
            activePlayerItemsComponent
          )}
        </Board>
        <SpotifyPlayer />
      </DisableHoverContainer>
      <Deck>
        {socket.id === activePlayer.socketId
          ? activePlayerItemsComponent
          : (
            <>
              <PlayerCards clickedPlayerId={clickedPlayerId} />
              <Separator />
              <PlayerTokens />
            </>
          )}
      </Deck>
      {isDragging && (
        <DraggableCard
          dragPosition={dragPosition}
          activeCardWidth={activeCardWidth}
        />
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

const Deck = styled.div`
  display: flex;
  justify-content: center;
  height: 20vh;
  border-radius: 16px 16px 0px 0px;
  box-shadow: 0 4px 30px hsla(0, 0%, 0%, 10%);
  background: hsla(0, 0%, 100%, 20%);
  user-select: none;
  position: relative;
`;

const Board = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Separator = styled.div`
  position: absolute;
  right: 6.8%;
  top: 5%;
  width: 0.1rem;
  height: 90%;
  background-color: #fff;
`;

const Header = styled.div``

const DisableHoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;

  &.disable-hover {
    pointer-events: none;
  }
`

const Container = styled.div`
  height: 100vh;
  background-color: #0a1d36;

  /* &::before {
    content: "";
    position: absolute;
    background: linear-gradient(purple, orangered);
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    z-index: -1;
  } */
`;
