import { useStateProvider } from "./StateProvider";

export function useMouseHandlersHelpers() {
  const [{ activePlayer, cards, activeCard }] = useStateProvider();

  function moveActiveCardTo(playerId: string | null) {
    const newCards = cards.map((card) =>
      card.id === activeCard.id ? { ...card, playerId: playerId } : card
    );

    return newCards;
  }

  function isActiveCardInBoard() {
    return activeCard.playerId === "board";
  }

  function isActiveCardInStack() {
    return activeCard.playerId === null;
  }

  function isActiveCardInPlayer() {
    return activeCard.playerId === activePlayer.socketId;
  }

  return { moveActiveCardTo, isActiveCardInBoard, isActiveCardInStack, isActiveCardInPlayer };
}
