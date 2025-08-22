import { v4 as uuidv4 } from "uuid";
import { CardInterface, GameInterface, TokenInterface } from "../../shared/interfaces";
import { getActiveCard, getActivePlayerId, isCard, isToken } from "../../shared/utils";
import { Console } from "console";
import { get } from "http";

export default function useGameRules({
  gameState,
  players,
  items,
}: GameInterface) {
  function nextTurn() {
    if (getActiveCard(items).playerId !== null) {
      const validTokens = getValidTokens();

      if (isCardRightAnswer()) {
        items = rightAnswer(validTokens);
      } else {
        items = wrongAnswer(validTokens);
      }

      if (isStackEmpty()) {
        items = refillCards();
      }

      setNextActiveCard();
      setNextActivePlayer();
    }
    return { gameState, players, items };
  }

  function isCardRightAnswer() {
    const playerCards = items.filter(
      (item): item is CardInterface =>
        isCard(item) && item.playerId === getActivePlayerId(players)
    );
    const activeCardindex = playerCards.findIndex(
      (card) => card.active
    );

    const activeDate = parseInt(getActiveCard(items).date);
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
        isCard(item) && item.playerId !== null && !item.active
    );

    // Duplicate the active card for each player
    validTokens.forEach((token) => {
      newPlayerCards.push({
        ...getActiveCard(items),
        id: uuidv4(),
        playerId: token.playerId,
        active: false,
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
        ? item.playerId === getActivePlayerId(players)
        : item.activePlayerId === getActivePlayerId(players)
    );
    const validTokens: TokenInterface[] = [];

    for (let i = 0; i < activeItems.length; i++) {
      const currentItem = activeItems[i];

      if (isCard(currentItem)) continue;

      const prevCard = i > 0 ? activeItems[i - 1] : null;
      const nextCard = i < activeItems.length - 1 ? activeItems[i + 1] : null;
      const activeCard = getActiveCard(items);

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

  function setNextActiveCard() {
    items.forEach(
      (item) => isCard(item) && (item.active = false)
    );
    items.findLast(
      (item): item is CardInterface => isCard(item) && item.playerId === null
    )!.active = true;
  }

  function setNextActivePlayer() {
    const activePlayerIndex = players.findIndex(
      (player) => player.active
    );

    players[activePlayerIndex].active = false;
    players[(activePlayerIndex + 1) % players.length].active = true;
  }

  return { nextTurn };
}
