import { CardInterface, GameInterface, TokenInterface } from "../../Interfaces";
import { v4 as uuidv4 } from "uuid";
import { isCard, isToken } from "../../utils";

export default function useGameRules({
  gameState,
  players,
  activePlayer,
  items,
  activeCard,
}: GameInterface) {
  function nextTurn() {
    if (activeCard.playerId !== null) {
      const validTokens = getValidTokens();

      if (isCardRightAnswer()) {
        items = rightAnswer(validTokens);
      } else {
        items = wrongAnswer(validTokens);
      }

      if (isStackEmpty()) {
        items = refillCards();
      }

      activeCard = getNextActiveCard();
      activePlayer = getNextActivePlayer();
    }
    return { gameState, players, activePlayer, items, activeCard };
  }

  function isCardRightAnswer() {
    const playerCards = items.filter(
      (item): item is CardInterface =>
        isCard(item) && item.playerId === activePlayer.socketId
    );
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

  function rightAnswer(validTokens: TokenInterface[]) {
    const newTokens = items
      .filter(
        (item): item is TokenInterface =>
          isToken(item) && (!item.active || validTokens.includes(item))
      )
      .map((token) => ({ ...token, active: false, activePlayerId: null }));
    const newStackCards = items.filter(
      (item): item is CardInterface => isCard(item) && item.playerId === null
    );
    const newPlayerCards = items.filter(
      (item): item is CardInterface => isCard(item) && item.playerId !== null
    );

    return [...newTokens, ...newStackCards, ...newPlayerCards];
  }

  function wrongAnswer(validTokens: TokenInterface[]) {
    const newTokens = items.filter(
      (item): item is TokenInterface => isToken(item) && !item.active
    );
    const newStackCards = items.filter(
      (item): item is CardInterface => isCard(item) && item.playerId === null
    );
    const newPlayerCards = items.filter(
      (item): item is CardInterface =>
        isCard(item) && item.playerId !== null && item.id !== activeCard.id
    );

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

  function getValidTokens() {
    const activeItems = items.filter((item) =>
      isCard(item)
        ? item.playerId === activePlayer.socketId
        : item.activePlayerId === activePlayer.socketId
    );
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

  function isStackEmpty() {
    return !items.find((item) => isCard(item) && item.playerId === null);
  }

  function refillCards() {
    const spareCards = items
      .filter((item) => isCard(item))
      .map((card) => ({
        ...card,
        id: uuidv4(),
        playerId: null,
      }));

    return [...items, ...spareCards];
  }

  function getNextActiveCard() {
    const newActiveCard = items.findLast(
      (item): item is CardInterface => isCard(item) && item.playerId === null
    )!;

    return newActiveCard;
  }

  function getNextActivePlayer() {
    const activePlayerIndex = players.findIndex(
      (player) => player.socketId === activePlayer.socketId
    );

    return players[(activePlayerIndex + 1) % players.length];
  }

  return { nextTurn };
}
