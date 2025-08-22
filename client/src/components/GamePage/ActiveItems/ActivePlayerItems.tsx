import styled from "styled-components";

import { CardInterface, TokenInterface } from "@shared/interfaces";
import { getActivePlayerId, isCard } from "@shared/utils";
import { useStateProvider } from "src/utils/StateProvider";
import ActiveCard from "src/components/elements/Card/ActiveCard";
import ActiveToken from "src/components/elements/Token/ActiveToken";

interface CardProps {
  setActiveCardWidth: (width: number) => void;
  handleMouseClick: (token: TokenInterface) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
  handleMouseDraggingOver: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    item: CardInterface | TokenInterface
  ) => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    item: CardInterface | TokenInterface
  ) => void;
}

export default function ActivePlayerItems({
  setActiveCardWidth,
  handleMouseClick,
  handleMouseDown,
  handleMouseLeave,
  handleMouseDraggingOver,
  handleMouseOver,
}: CardProps) {
  const [{ socket, items, players }] = useStateProvider();

  const isInDeck = socket.id === getActivePlayerId(players);

  return (
    <ActivePlayerItemsContainer
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      style={{
        backgroundColor: isInDeck ? 'transparent' : 'hsla(0, 0%, 100%, 5%)',
        maxWidth: isInDeck ? '95%' : 'none',
        width: isInDeck ? '95%' : '80vw',
      }}
    >
      {items
        .filter((item) =>
          isCard(item)
            ? item.playerId === getActivePlayerId(players)
            : item.activePlayerId === getActivePlayerId(players)&&
              item.activePlayerId !== item.playerId
        )
        .map((item) =>
          isCard(item) ? (
            <ActiveCard
              key={item.id}
              card={item}
              setActiveCardWidth={setActiveCardWidth}
              handleMouseDown={handleMouseDown}
              handleMouseDraggingOver={handleMouseDraggingOver}
              handleMouseOver={handleMouseOver}
            />
          ) : (
            <ActiveToken
              key={item.id}
              token={item}
              handleMouseClick={handleMouseClick}
              handleMouseDraggingOver={handleMouseDraggingOver}
              handleMouseOver={handleMouseOver}
            />
          )
        )}
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
