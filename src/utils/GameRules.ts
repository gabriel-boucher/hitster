import { useRef } from "react";
import { reducerCases } from "./Constants";
import { CardInterface, TokenInterface } from "./Interfaces";
import { useStateProvider } from "./StateProvider";
import { v4 as uuidv4 } from "uuid";
import { isCard, getActiveItems, isToken } from "./Items";

export default function useGameRules() {
  const [{ players, activePlayer, items, activeCard }, dispatch] =
    useStateProvider();
  const spareCards = useRef<CardInterface[]>([
    ...items.filter((item) => isCard(item)),
  ]);

  function nextTurn() {
    if (activeCard.playerId !== null) {
      let newItems = [...items];

      newItems = removeTokens(newItems);

      if (!isCardRightAnswer()) {
        newItems = removeCard(newItems);
      }

      if (isStackEmpty(newItems)) {
        newItems = refillCards(newItems);
      }

      dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      setNextActiveCard(newItems);
      setNextActivePlayer();
    }
  }

  function isCardRightAnswer() {
    const playerCards = items
      .filter((item) => isCard(item))
      .filter((card) => card.playerId === activePlayer.socketId);
    const activeCardindex = playerCards.findIndex(
      (card) => card.id === activeCard.id
    );

    const activeDate = parseInt(activeCard.date);
    const beforeDate =
      activeCardindex > 0
        ? parseInt(playerCards[activeCardindex - 1].date)
        : -Infinity;
    const afterDate =
      activeCardindex < playerCards.length - 1
        ? parseInt(playerCards[activeCardindex + 1].date)
        : Infinity;
    return beforeDate <= activeDate && activeDate <= afterDate;
  }

  function removeCard(currentItems: (CardInterface | TokenInterface)[]) {
    const newCards = currentItems.filter((item) => item.id !== activeCard.id);
    return newCards;
  }

  function removeTokens(currentItems: (CardInterface | TokenInterface)[]) {
    const activeItems = getActiveItems(currentItems, activePlayer.socketId);
    const invalidTokens: TokenInterface[] = [];

    for (let i = 0; i < activeItems.length; i++) {
      const currentItem = activeItems[i];

      if (isCard(currentItem)) continue;

      const prevCard = i > 0 ? activeItems[i - 1] : null;
      const nextCard = i < activeItems.length - 1 ? activeItems[i + 1] : null;

      const isValidPosition =
        // Case 1: First item, only check next card
        (i === 0 &&
          nextCard &&
          isCard(nextCard) &&
          nextCard.date >= activeCard.date) ||
        // Case 2: Last item, only check previous card
        (i === activeItems.length - 1 &&
          prevCard &&
          isCard(prevCard) &&
          prevCard.date <= activeCard.date) ||
        // Case 3: Between two cards with correct dates
        (prevCard &&
          nextCard &&
          isCard(prevCard) &&
          isCard(nextCard) &&
          prevCard.date <= activeCard.date &&
          activeCard.date <= nextCard.date);

      if (!isValidPosition) {
        invalidTokens.push(currentItem);
      }
    }

    return currentItems
      .filter(
        (item) => isCard(item) || (isToken(item) && !invalidTokens.includes(item))
      )
      .map((item) =>
        isToken(item) ? { ...item, active: false, activePlayerId: null } : item
      );
  }

  function isStackEmpty(currentItems: (CardInterface | TokenInterface)[]) {
    return (
      currentItems
        .filter((item) => isCard(item))
        .filter((card) => card.playerId === null).length === 0
    );
  }

  function refillCards(currentItems: (CardInterface | TokenInterface)[]) {
    const newSpareCards = spareCards.current.map((card) => ({
      ...card,
      id: uuidv4(),
      playerId: null,
    }));
    const newCards = [...currentItems, ...newSpareCards];
    return newCards;
  }

  function setNextActiveCard(currentItems: (CardInterface | TokenInterface)[]) {
    const newActiveCard = currentItems
      .filter((item) => isCard(item))
      .filter((card) => card.playerId === null)
      .at(-1)!;

    dispatch({ type: reducerCases.SET_ACTIVE_CARD, activeCard: newActiveCard });
  }

  function setNextActivePlayer() {
    const activePlayerIndex = players.findIndex(
      (player) => player.socketId === activePlayer.socketId
    );
    dispatch({
      type: reducerCases.SET_ACTIVE_PLAYER,
      activePlayer: players[(activePlayerIndex + 1) % players.length],
    });
  }

  return { nextTurn };
}
