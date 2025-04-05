import { useRef } from "react";
import { reducerCases } from "./Constants";
import { CardInterface } from "./Interfaces";
import { useStateProvider } from "./StateProvider";
import { v4 as uuidv4 } from "uuid";

export default function useGameRules() {
  const [{ players, activePlayer, cards, activeCard }, dispatch] =
    useStateProvider();
  const spareCards = useRef<CardInterface[]>([...cards]);

  function nextTurn() {
    if (activeCard.playerId !== null) {
      let newCards = [...cards];

      if (!isRightAnswer()) {
        newCards = removeCard(newCards);
      }

      if (isStackEmpty(newCards)) {
        newCards = refillCards(newCards);
      }

      setNextActiveCard();
      setNextActivePlayer();
    }
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
      playerId: null,
    }));
    const newCards = [...currentCards, ...newSpareCards];
    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    return newCards;
  }

  function setNextActiveCard() {
    const newActiveCard = cards
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
