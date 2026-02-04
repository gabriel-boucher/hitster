import styled from "styled-components";

import ActiveCard from "src/components/elements/Card/ActiveCard";
import ActiveToken from "src/components/elements/Token/ActiveToken";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import useMouseLeaveDeck from "../../../hooks/socket/movement/useMouseLeaveDeck.ts";
import useMouseDragLeaveDeck from "../../../hooks/socket/movement/useMouseDragLeaveDeck.ts";

export default function ActivePlayerItems() {
  const [{ playerId }] = useConnectionStateProvider();
  const [{ items, currentPlayerId }] = useGameStateProvider();

  const mouseDragLeaveDeck = useMouseDragLeaveDeck()
  const mouseLeaveDeck = useMouseLeaveDeck()

  const isInDeck = playerId === currentPlayerId;

  return (
    <ActivePlayerItemsContainer
      onMouseLeave={playerId === currentPlayerId ? mouseDragLeaveDeck : mouseLeaveDeck}
      onTouchEnd={playerId === currentPlayerId ? mouseDragLeaveDeck : mouseLeaveDeck}
      style={{
        backgroundColor: isInDeck ? 'transparent' : 'hsla(0, 0%, 100%, 5%)',
        maxWidth: isInDeck ? '95%' : 'none',
        width: isInDeck ? '95%' : '80vw',
      }}
    >
      {
        items.map((item) => item.type === "card" ? (
          <ActiveCard key={item.id} card={item} />
        ) : (
          <ActiveToken key={item.id} token={item} />
        ))
      }
    </ActivePlayerItemsContainer>
  );
}

const ActivePlayerItemsContainer = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-left: 1%;
  padding-right: 1%;
  border-radius: 1rem;
`;
