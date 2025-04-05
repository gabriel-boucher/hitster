import styled from "styled-components";
import { useStateProvider } from "../../../utils/StateProvider";
import ActiveCard from "./ActiveCard";
import TokenInDeck from "../Token/TokenInDeck";
import { CardInterface } from "../../../utils/Interfaces";
import { TokenInterface } from "../../../utils/Interfaces";

interface CardProps {
  isDragging: boolean;
  setActiveCardWidth: (width: number) => void;
  handleMouseClick: (token: TokenInterface) => void;
  handleMouseDown: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseLeave: () => void;
  handleMouseOver: (
    e: React.MouseEvent<HTMLDivElement>,
    card: CardInterface
  ) => void;
  handleMouseOverToken: (
    e: React.MouseEvent<HTMLDivElement>,
    token: TokenInterface
  ) => void;
}

export default function ActivePlayerCards({
  isDragging,
  setActiveCardWidth,
  handleMouseClick,
  handleMouseDown,
  handleMouseLeave,
  handleMouseOver,
  handleMouseOverToken,
}: CardProps) {
  const [{ activePlayer, items }] = useStateProvider();

  return (
    <PlayerCardsContainer onMouseLeave={handleMouseLeave}>
      {items
        .filter((item) =>
          "song" in item
            ? item.playerId === activePlayer.socketId
            : item.activePlayerId === activePlayer.socketId &&
              item.activePlayerId !== item.playerId
        )
        .map((item) =>
          "song" in item ? (
            <ActiveCard
              key={item.id}
              card={item}
              isDragging={isDragging}
              setActiveCardWidth={setActiveCardWidth}
              handleMouseDown={handleMouseDown}
              handleMouseOver={handleMouseOver}
            />
          ) : (
            <TokenInDeck
              key={item.id}
              token={item}
              handleMouseClick={handleMouseClick}
              handleMouseOverToken={handleMouseOverToken}
            />
          )
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
