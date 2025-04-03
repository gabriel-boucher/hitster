import { useRef } from "react";
import { reducerCases } from "../utils/Constants";
import { CardInterface } from "../utils/Interfaces";
import { useStateProvider } from "../utils/StateProvider";
import { v4 as uuidv4 } from "uuid";

export default function useGameRules() {
  const [{ activePlayer, cards, activeCard }, dispatch] = useStateProvider();
  const spareCards = useRef<CardInterface[]>([...cards]);

  function nextTurn() {
    let newCards = revealCard();

    if (!isRightAnswer()) {
      newCards = removeCard(newCards);
    }

    if (isStackEmpty(newCards)) {
      newCards = refillCards(newCards);
    }

    setActiveCardToLast(newCards);
  }

  function revealCard() {
    const newCards = cards.map((card) =>
      card.id === activeCard.id ? { ...card, hidden: false } : card
    );

    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    return newCards;
  }

  function isRightAnswer() {
    const playerCards = cards.filter(
      (card) => card.playerId === activePlayer.socketId
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

  function removeCard(currentCards: CardInterface[]) {
    const newCards = currentCards.filter((card) => card.id !== activeCard.id);
    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    return newCards;
  }

  function isStackEmpty(currentCards: CardInterface[]) {
    return currentCards.filter((card) => card.playerId === null).length === 0;
  }

  function refillCards(currentCards: CardInterface[]) {
    const newSpareCards = spareCards.current.map((card) => ({
      ...card,
      id: uuidv4(),
      hidden: true,
      playerId: null,
    }));
    const newCards = [...currentCards, ...newSpareCards];
    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    return newCards;
  }

  function setActiveCardToLast(currentCards: CardInterface[]) {
    const lastCard = currentCards[currentCards.length - 1];
    dispatch({
      type: reducerCases.SET_ACTIVE_CARD,
      activeCard: lastCard,
    });
  }

  return { nextTurn };
}
