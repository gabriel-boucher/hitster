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
    if (activeCard && activeCard.playerId !== null) {
      let newItems = [...items];

      const validTokens = getValidTokens(newItems);

      if (isCardRightAnswer(newItems)) {
        newItems = rightAnswer(newItems, validTokens);
      } else {
        newItems = wrongAnswer(newItems, validTokens);
      }

      if (isStackEmpty(newItems)) {
        newItems = refillCards(newItems);
      }

      dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      setNextActiveCard(newItems);
      setNextActivePlayer();
    }
  }

  function isCardRightAnswer(newItems: (CardInterface | TokenInterface)[]) {
    const playerCards = newItems
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

  function rightAnswer(
    newItems: (CardInterface | TokenInterface)[],
    validTokens: TokenInterface[]
  ) {
    const newTokens = newItems
      .filter((item) => isToken(item))
      .filter((token) => !token.active || validTokens.includes(token))
      .map(
        (token) => token && { ...token, active: false, activePlayerId: null }
      );
    const newStackCards = newItems
      .filter((item) => isCard(item))
      .filter((card) => card.playerId === null);
    const newPlayerCards = newItems
      .filter((item) => isCard(item))
      .filter((card) => card.playerId !== null);

    return [...newTokens, ...newStackCards, ...newPlayerCards];
  }

  function wrongAnswer(
    newItems: (CardInterface | TokenInterface)[],
    validTokens: TokenInterface[]
  ) {
    const newTokens = newItems
      .filter((item) => isToken(item))
      .filter((token) => !token.active);
    const newStackCards = newItems
      .filter((item) => isCard(item))
      .filter((card) => card.playerId === null);
    const newPlayerCards = newItems
      .filter((item) => isCard(item))
      .filter((card) => card.playerId !== null && card.id !== activeCard.id);

    // Duplicate the active card for each player
    validTokens.forEach((token) => {
      newPlayerCards.push({
        ...activeCard,
        id: uuidv4(),
        playerId: token.playerId,
      });
    });

    const sortedCards = newPlayerCards.sort((a, b) => {
      if (
        a.playerId !== b.playerId &&
        a.playerId !== null &&
        b.playerId !== null
      )
        return a.playerId.localeCompare(b.playerId);
      return parseInt(a.date) - parseInt(b.date);
    });

    return [...newTokens, ...newStackCards, ...sortedCards];
  }

  function getValidTokens(newItems: (CardInterface | TokenInterface)[]) {
    const activeItems = getActiveItems(newItems, activePlayer.socketId);
    const validTokens: TokenInterface[] = [];

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

      if (isValidPosition) {
        validTokens.push(currentItem);
      }
    }

    return validTokens;
  }

  function isStackEmpty(newItems: (CardInterface | TokenInterface)[]) {
    return (
      newItems
        .filter((item) => isCard(item))
        .filter((card) => card.playerId === null).length === 0
    );
  }

  function refillCards(newItems: (CardInterface | TokenInterface)[]) {
    const newSpareCards = spareCards.current.map((card) => ({
      ...card,
      id: uuidv4(),
      playerId: null,
    }));
    const newCards = [...newItems, ...newSpareCards];
    return newCards;
  }

  function setNextActiveCard(newItems: (CardInterface | TokenInterface)[]) {
    const newActiveCard = newItems
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
