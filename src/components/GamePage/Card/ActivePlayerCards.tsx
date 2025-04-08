import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import ActiveCard from "./ActiveCard";
import TokenInDeck from "../Token/TokenInDeck";
import { CardInterface } from "../../../utils/Interfaces";
import { TokenInterface } from "../../../utils/Interfaces";
import { isCard } from "../../../utils/Items";

interface CardProps {
  isDragging: boolean;
  setActiveCardWidth: (width: number) => void;
  handleMouseClick: (token: TokenInterface) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
  handleMouseOverDragging: (
    e: React.MouseEvent<HTMLDivElement>,
    item: CardInterface | TokenInterface
  ) => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement>,
    item: CardInterface | TokenInterface
  ) => void;
}

export default function ActivePlayerCards({
  isDragging,
  setActiveCardWidth,
  handleMouseClick,
  handleMouseDown,
  handleMouseLeave,
  handleMouseOverDragging,
  handleMouseOver,
}: CardProps) {
  const [{ activePlayer, items }] = useStateProvider();

  return (
    <ActivePlayerCardsContainer onMouseLeave={handleMouseLeave}>
      {items
        .filter((item) =>
          isCard(item)
            ? item.playerId === activePlayer.socketId
            : item.activePlayerId === activePlayer.socketId &&
              item.activePlayerId !== item.playerId
        )
        .map((item) =>
          isCard(item) ? (
            <ActiveCard
              key={item.id}
              card={item}
              isDragging={isDragging}
              setActiveCardWidth={setActiveCardWidth}
              handleMouseDown={handleMouseDown}
              handleMouseOverDragging={handleMouseOverDragging}
              handleMouseOver={handleMouseOver}
            />
          ) : (
            <TokenInDeck
              key={item.id}
              token={item}
              isDragging={isDragging}
              handleMouseClick={handleMouseClick}
              handleMouseOverDragging={handleMouseOverDragging}
              handleMouseOver={handleMouseOver}
            />
          )
        )}
    </ActivePlayerCardsContainer>
  );
}

const ActivePlayerCardsContainer = styled.div`
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
