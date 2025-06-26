import { CardInterface, TokenInterface } from "@shared/Interfaces";
import { useStateProvider } from "./StateProvider";
import { isToken } from "@shared/utils";

export function useMouseHandlersHelpers() {
  const [{ socket, activePlayer, items, activeCard, isDragging }] = useStateProvider();

  function isActiveCardInBoard() {
    return activeCard.playerId === "board";
  }

  function isActiveCardInStack() {
    return activeCard.playerId === null;
  }

  function isOverActiveCard(over: CardInterface | TokenInterface) {
    return activeCard.id === over.id;
  }

  function isActiveTokenEntering() {
    return !items.find(
      (item) =>
        isToken(item) &&
        item.playerId === socket.id &&
        item.activePlayerId === activePlayer.socketId &&
        item.active === false
    );
  }

  function getNewIndex(
    e: React.MouseEvent<HTMLDivElement>,
    newItems: (CardInterface | TokenInterface)[],
    over: CardInterface | TokenInterface
  ) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    if (
      (isDragging && isActiveCardInBoard()) ||
      (!isDragging && isActiveTokenEntering())
    ) {
      const overIndex = newItems.findIndex(
        (item) => item.id === over.id
      );
      return mouseX < rect.width / 2 ? overIndex : overIndex + 1;
    } else {
      const overIndex = items.findIndex((item) => item.id === over.id);
      return overIndex;
    }
  }

  return {
    isActiveCardInBoard,
    isActiveCardInStack,
    isOverActiveCard,
    getNewIndex,
  };
}
