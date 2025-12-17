import { CardInterface, TokenInterface } from "@shared/interfaces";
import { useStateProvider } from "../utils/StateProvider";
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
        !item.active
    );
  }

  function getNewIndex(
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
    newItems: (CardInterface | TokenInterface)[],
    over: CardInterface | TokenInterface
  ) {
    const rect = e.currentTarget.getBoundingClientRect();

    let clientX: number;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }

    const mouseX = clientX - rect.left;

    if ( // if mouse entering the deck
      (isDragging && isActiveCardInBoard()) ||
      (!isDragging && isActiveTokenEntering())
    ) {
      const overIndex = newItems.findIndex(
        (item) => item.id === over.id
      );
      return mouseX < rect.width / 2 ? overIndex : overIndex + 1;
    } else { // if mouse already in deck
      const overIndex = items.findIndex(
        (item) => item.id === over.id
      );
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
