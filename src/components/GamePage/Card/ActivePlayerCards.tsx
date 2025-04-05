import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import ActiveCard from "./ActiveCard";
import TokenInDeck from "../Token/TokenInDeck";
import { CardInterface } from "../../../utils/Interfaces";
import { TokenInterface } from "../../../utils/Interfaces";
import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface CardProps {
  isDragging: boolean;
  setActiveCardWidth: (width: number) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
}

export default function ActivePlayerCards({
  isDragging,
  setActiveCardWidth,
  handleMouseDown,
  handleMouseOver,
  handleMouseLeave,
}: CardProps) {
  const [{ activePlayer, cards }] = useStateProvider();
  const [activeItems, setActiveItems] = useState<
    (CardInterface | TokenInterface)[]
  >(cards.filter((card) => card.playerId === activePlayer.socketId));

  function bruh(
    e: React.MouseEvent<HTMLDivElement>,
    newActiveItems: (CardInterface | TokenInterface)[],
    overCard: CardInterface
  ) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    const overCardIndex = newActiveItems.findIndex((card) => card.id === overCard.id);
    return mouseX < rect.width / 2 ? overCardIndex : overCardIndex + 1;
  }

  const test = useCallback((e: React.MouseEvent<HTMLDivElement>, overCard: CardInterface) => {
    if (isDragging) {
      handleMouseOver(e, overCard);
    } else {
      const newActiveItems: (CardInterface | TokenInterface)[] = activeItems.filter((item) => "song" in item);
      const newIndex = bruh(e, newActiveItems, overCard);
      newActiveItems.splice(newIndex, 0, {id: uuidv4(), playerId: activePlayer.socketId});
      setActiveItems(newActiveItems)
    }
  }, [cards])

  return (
    <PlayerCardsContainer onMouseLeave={handleMouseLeave}>
      {cards.filter((card) => card.playerId === activePlayer.socketId)
      .map((item, index) =>
        // "song" in item ? (
          <ActiveCard
            key={item.id}
            index={index}
            card={item}
            isDragging={isDragging}
            setActiveCardWidth={setActiveCardWidth}
            handleMouseDown={handleMouseDown}
            handleMouseOver={handleMouseOver}
          />
        // ) : (
        //   <TokenInDeck key={item.id}/>
        // )
      )}
    </PlayerCardsContainer>
  );
}

const PlayerCardsContainer = styled.div`
  height: 20vh;
  max-width: 80%;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #07245a;
  padding-left: 1%;
  padding-right: 1%;
`;
