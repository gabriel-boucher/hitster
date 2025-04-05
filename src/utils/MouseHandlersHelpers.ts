import { CardInterface, TokenInterface } from "./Interfaces";
import { useStateProvider } from "./StateProvider";

export function useMouseHandlersHelpers(isDragging: boolean) {
  const [{ players, activePlayer, items, activeCard }] = useStateProvider();

  function moveActiveCardTo(playerId: string | null) {
    const newCards = items.map((item) =>
      item.id === activeCard.id ? { ...item, playerId: playerId } : item
    );

    return newCards;
  }

  function isActiveCardInBoard() {
    return activeCard.playerId === "board";
  }

  function isActiveCardInStack() {
    return activeCard.playerId === null;
  }

  function isActiveTokenEntering() {
    return items
      .filter((item) => "activePlayerId" in item)
      .filter(
        (token) =>
          token.playerId === players[0].socketId &&
          token.activePlayerId === activePlayer.socketId &&
          token.active === false
      ).length === 0;
  }

  function getNewIndex(
    e: React.MouseEvent<HTMLDivElement>,
    newCards: (CardInterface | TokenInterface)[],
    overCard: CardInterface | TokenInterface
  ) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    if (
      (isDragging && isActiveCardInBoard()) ||
      (!isDragging && isActiveTokenEntering())
    ) {
      const overCardIndex = newCards.findIndex(
        (card) => card.id === overCard.id
      );
      return mouseX < rect.width / 2 ? overCardIndex : overCardIndex + 1;
    } else {
      const overCardIndex = items.findIndex((card) => card.id === overCard.id);
      return overCardIndex;
    }
  }

  return {
    moveActiveCardTo,
    isActiveCardInBoard,
    isActiveCardInStack,
    getNewIndex,
  };
}
