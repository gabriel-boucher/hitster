import { CardInterface, TokenInterface } from "@shared/Interfaces";
import { useStateProvider } from "./StateProvider";
import { getActiveCard, getActivePlayerId, isCard, isToken } from "@shared/utils";

export function useMouseHandlersHelpers() {
  const [{ socket, items, players, isDragging }] = useStateProvider();

  function isActiveCardInBoard() {
    return getActiveCard(items).playerId === "board";
  }

  function isActiveCardInStack() {
    return getActiveCard(items).playerId === null;
  }

  function isOverActiveCard(over: CardInterface | TokenInterface) {
    return isCard(over) && over.active;
  }

  function isActiveTokenEntering() {
    return !items.find(
      (item) =>
        isToken(item) &&
        item.playerId === socket.id &&
        item.activePlayerId === getActivePlayerId(players) &&
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
