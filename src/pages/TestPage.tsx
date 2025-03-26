import styled from "styled-components";
import Card from "./Card";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { useStateProvider } from "../utils/StateProvider";
import { useMemo } from "react";
import { reducerCases } from "../utils/Constants";

export default function TestPage() {
  const [{ cards, activeCard }, dispatch] = useStateProvider();

  const cardIds = useMemo(() => cards.map((card) => card.id), [cards]);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));

  function onDragStart(event: DragStartEvent) {
    console.log(event)
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    if (active.id === over.id) return;

    const activeIndex = cards.findIndex((card) => card.id === active.id);
    const overIndex = cards.findIndex((card) => card.id === over.id);

    dispatch({
      type: reducerCases.SET_CARDS,
      cards: arrayMove(cards, activeIndex, overIndex),
    });
  }

  return (
    <Container>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <Stack>test</Stack>
        <Deck>
          <SortableContext items={cardIds}>
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </SortableContext>
        </Deck>
        {createPortal(
          <DragOverlay>{activeCard && <Card card={activeCard} />}</DragOverlay>,
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
  gap: 10vh;
  height: 100vh;
`;

const Stack = styled.div`
  position: relative;
  height: 20vh;
  width: 20vh;
  background-color: red;
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
