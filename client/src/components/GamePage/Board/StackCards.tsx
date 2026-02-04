import styled from "styled-components";
import CardInStack from "../../elements/Card/CardInStack";
import { useMemo } from "react";
import {useGameStateProvider} from "../../../stateProvider/game/GameStateProvider.tsx";
import {Card} from "../../../type/item/Card.ts";
import {ItemStatus} from "../../../type/item/ItemStatus.ts";
import useMouseLeaveDeck from "../../../hooks/socket/movement/useMouseLeaveDeck.ts";

export default function StackCards() {
  const [{ items, currentCardId, currentCardStatus }] = useGameStateProvider();

  const mouseLeaveDeck = useMouseLeaveDeck();

  const handleMouseEvents = useMemo(() => ({
    onMouseLeave: mouseLeaveDeck,
    onTouchEnd: mouseLeaveDeck,
  }), [mouseLeaveDeck]);

  const cards: Card[] = Array.from({ length: 19 }, (_, i) => ({
    type: "card",
    id: `stack-card-${i}`,
    status: ItemStatus.UNUSED,
    song: "",
    artist: "",
    date: "",
    albumUrl: "",
  }));

  return (
    <Container>
      <Stack {...handleMouseEvents}>
        {cards.map((card, index) =>
          <CardInStack
            key={card.id}
            index={index - items.length + 20}
            card={card}
          />
        )}
          {currentCardStatus === ItemStatus.UNUSED && (
            <CardInStack
              key={currentCardId}
              index={19 - items.length + 20}
              card={{
                type: "card",
                id: currentCardId,
                status: ItemStatus.UNUSED,
                song: "",
                artist: "",
                date: "",
                albumUrl: "",
              }}
            />
          )}
      </Stack>
    </Container>
  );
}

const Stack = styled.div`
  height: 16vh;
  width: 16vh;
  user-select: none;
  position: relative;
`;

const Container = styled.div`
  /* flex: 1; */
  display: flex;
  /* justify-content: right; */
  align-items: center;
  /* margin-right: -16vh; */
`;
