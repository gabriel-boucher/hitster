import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import ActiveCard from "./ActiveCard";
import ActiveToken from "./ActiveToken";
import { CardInterface, TokenInterface } from "@shared/Interfaces";
import { isCard } from "@shared/utils";

interface CardProps {
  isDragging: boolean;
  setActiveCardWidth: (width: number) => void;
  handleMouseClick: (token: TokenInterface) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
  handleMouseDraggingOver: (
    e: React.MouseEvent<HTMLDivElement>,
    item: CardInterface | TokenInterface
  ) => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement>,
    item: CardInterface | TokenInterface
  ) => void;
}

export default function ActivePlayerItems({
  isDragging,
  setActiveCardWidth,
  handleMouseClick,
  handleMouseDown,
  handleMouseLeave,
  handleMouseDraggingOver,
  handleMouseOver,
}: CardProps) {
  const [{ socket, activePlayer, items }] = useStateProvider();

  const isInDeck = socket.id === activePlayer.socketId;

  return (
    <ActivePlayerItemsContainer
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: isInDeck ? 'transparent' : '#07245a',
        maxWidth: isInDeck ? '95%' : 'none',
        width: isInDeck ? '95%' : '80vw',
      }}
    >
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
              handleMouseDraggingOver={handleMouseDraggingOver}
              handleMouseOver={handleMouseOver}
            />
          ) : (
            <ActiveToken
              key={item.id}
              token={item}
              isDragging={isDragging}
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
  /* height: 20vh;
  width: 80vw;
  background-color: #07245a;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-left: 1%;
  padding-right: 1%; */
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding-left: 1%;
  padding-right: 1%;
  border-radius: 1rem;
`;
