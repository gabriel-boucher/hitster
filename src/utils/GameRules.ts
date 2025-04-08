import { useRef } from "react";
import { reducerCases } from "./Constants";
import { CardInterface, TokenInterface } from "./Interfaces";
import { useStateProvider } from "./StateProvider";
import { v4 as uuidv4 } from "uuid";
import { isCard } from "./Items";

export default function useGameRules() {
  const [{ players, activePlayer, items, activeCard }, dispatch] =
    useStateProvider();
  const spareCards = useRef<CardInterface[]>([...items.filter((item) => isCard(item))]);

  function nextTurn() {
    if (activeCard.playerId !== null) {
      let newItems = [...items];

      if (!isRightAnswer()) {
        newItems = removeCard(newItems);
      }

      if (isStackEmpty(newItems)) {
        newItems = refillCards(newItems);
      }

      setNextActiveCard();
      setNextActivePlayer();
    }
  }

  function isRightAnswer() {
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

  function removeCard(currentCards: (CardInterface | TokenInterface)[]) {
    const newCards = currentCards.filter((item) => item.id !== activeCard.id);
    dispatch({ type: reducerCases.SET_ITEMS, items: newCards });
    return newCards;
  }

  function isStackEmpty(currentCards: (CardInterface | TokenInterface)[]) {
    return (
      currentCards
        .filter((item) => isCard(item))
        .filter((card) => card.playerId === null).length === 0
    );
  }

  function refillCards(currentCards: (CardInterface | TokenInterface)[]) {
    const newSpareCards = spareCards.current.map((card) => ({
      ...card,
      id: uuidv4(),
      playerId: null,
    }));
    const newCards = [...newSpareCards, ...currentCards];
    dispatch({ type: reducerCases.SET_ITEMS, items: newCards });
    return newCards;
  }

  function setNextActiveCard() {
    const newActiveCard = items
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
