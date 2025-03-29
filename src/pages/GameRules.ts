import { useState } from "react";
import { reducerCases } from "../utils/Constants";
import { CardInterface } from "../utils/Interfaces";
import { useStateProvider } from "../utils/StateProvider";
import { v4 as uuidv4 } from "uuid";

export default function useGameRules() {
    const [{ players, activePlayer, cards, activeCard }, dispatch] =
    useStateProvider();
    const [spareCards, _] = useState<CardInterface[]>([...cards]);


  function revealCard(index: number) {
    const newCards = [...cards];
    newCards[index].hidden = false;
    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
  }

  function isRightAnswer() {
    const playerCards = cards.filter((card) => card.playerId === activePlayer.socketId);
    const index = playerCards.indexOf(activeCard);

    const active = parseInt(activeCard.date);
    const before =
      index > 0
        ? parseInt(playerCards[index - 1].date)
        : -Infinity;
    const after =
      index < playerCards.length - 1
        ? parseInt(playerCards[index + 1].date)
        : Infinity;

    return before <= active && active <= after;
  }

  function removeCard(index: number) {
    setTimeout(() => {
      const newCards = [...cards];
      newCards.splice(index, 1);
      dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    }, 1000);
  }

  function refillCards() {
    const newSpareCards = spareCards.map((card) => ({
      ...card,
      id: uuidv4(),
      hidden: true, // cards are changed to hidden false during the process (don't know why)
      playerId: null,
    }));
    const newCards = [...cards, ...newSpareCards];
    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    dispatch({
      type: reducerCases.SET_ACTIVE_CARD,
      activeCard: newCards[newCards.length - 1],
    }); // use cards because react doesn't update stackCards in time to use stackCards
  }

  function nextTurn() {
    const index = cards.indexOf(activeCard);

    revealCard(index);

    if (!isRightAnswer()) {
      removeCard(index);
    }

    dispatch({
      type: reducerCases.SET_ACTIVE_CARD,
      activeCard: cards[cards.length - 1],
    });

    if (cards.length === 0) {
      refillCards();
    }
  }

  return { nextTurn };
}
