import styled from "styled-components";
import CardInDeck from "./CardInDeck";
import CardInStack from "./CardInStack";
import DraggableCard from "./DraggableCard";
import useGameRules from "./GameRules";

import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  closestCenter,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragMoveEvent,
  closestCorners,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { createPortal } from "react-dom";
import { useStateProvider } from "../utils/StateProvider";
import { useCallback, useEffect, useMemo, useState } from "react";
import { reducerCases } from "../utils/Constants";
import { debounce } from "lodash";

export default function TestPage() {
  const [{ players, activePlayer, cards, activeCard }, dispatch] =
    useStateProvider();
  const debouncedDispatch = useCallback(
    debounce((action) => dispatch(action), 0),
    [dispatch]
  );
  const { nextTurn } = useGameRules();

  const cardIds = useMemo(() => cards.map((card) => card.id), [cards]);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  function onDragEnd(event: DragEndEvent) {
    dispatch({ type: reducerCases.SET_CARDS, cards: [...cards] });
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    
    if (!over) return;
    
    if (active.id === over.id) return;

    const isOverDeck = over.data.current?.type === "CardInDeck";

    if (isOverDeck) {
      const activeCardIndex = cards.findIndex((card) => card.id === active.id);
      const overCardIndex = cards.findIndex((card) => card.id === over.id);

      let newCards = [...cards];
      newCards[activeCardIndex].playerId = activePlayer.socketId;

      dispatch({
        type: reducerCases.SET_CARDS,
        cards: arrayMove(newCards, activeCardIndex, overCardIndex),
      });
    }

    const isOverStack = over.data.current?.type === "CardInStack";

    if (isOverStack) {
      const activeCardIndex = cards.findIndex((card) => card.id === active.id);

      const newCards = [...cards];
      newCards[activeCardIndex].playerId = null;

      dispatch({
        type: reducerCases.SET_CARDS,
        cards: arrayMove(newCards, activeCardIndex, cards.length - 1),
      });
    }
  }

  const stackContainer = useMemo(() => {
    return cards
      .filter((card) => card.playerId === null)
      .map((card, index) => (
        <CardInStack key={card.id} index={index} card={card} />
      ));
  }, [cards]);

  const deckContainer = useMemo(() => {
    return cards
      .filter((card) => card.playerId === activePlayer.socketId)
      .map((card) => <CardInDeck key={card.id} card={card} />);
  }, [cards, dispatch]);

  return (
    <Container>
      <DndContext
        sensors={sensors}
        onDragOver={onDragOver}
        modifiers={[restrictToWindowEdges]}
      >
        <button onClick={nextTurn}>Next Turn</button>
        <Stack>
          <SortableContext items={cardIds}>{stackContainer}</SortableContext>
        </Stack>
        <Deck>
          <SortableContext items={cardIds}>{deckContainer}</SortableContext>
        </Deck>
        {createPortal(
          <DragOverlay >{activeCard && <DraggableCard />}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30vh;
  height: 100vh;
`;

const Stack = styled.div`
  position: relative;
  height: 20vh;
  width: 20vh;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

const Deck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 20vh;
  width: 80vw;
  background-color: blue;
  padding: 0px 2% 0px 2%;
`;
