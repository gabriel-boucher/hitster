import styled from "styled-components";
import Menu from "../components/GamePage/Menu/Menu";
import Board from "../components/GamePage/Board/Board";
import Deck from "../components/GamePage/Deck/Deck";
import { useEffect, useRef, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases, cardStates, cardElements, gapElements } from "../utils/Constants";

export default function GamePage() {
  const [{ socketId, players, playersTurn, playerCards, openedGapIndex, cards, activeCard }, dispatch] =
    useStateProvider();
  const [activeCardReact, setActiveCardReact] = useState<HTMLElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newActiveCard = cards[cards.length - 1]
    dispatch({ type: reducerCases.SET_ACTIVE_CARD, activeCard: newActiveCard });
  }, [playersTurn])

  useEffect(() => {
    const newPlayers = new Map(players);
    newPlayers.set(socketId, { ...players.get(socketId)!, cards: playerCards });
    dispatch({ type: reducerCases.SET_PLAYERS, players: newPlayers });
  }, [playerCards]);

  function grabCard(e: React.MouseEvent) {
    const cardContainer = e.target as HTMLDivElement;
    const cardReact = cardContainer.parentElement!;
    
    if (cardReact.id !== activeCard.id) return;

    if (cardReact.classList.contains(cardStates.CARD_IN_HAND)) {
      cardReact.classList.remove(cardStates.CARD_IN_HAND);
      cardReact.classList.add(cardStates.CARD_IN_PLAY);
    }

    if (cardReact.classList.contains(cardStates.CARD_IN_PLAY)) {
      cardContainer.style.outline = "1px solid white";
      const x = e.clientX;
      const y = e.clientY;

      cardReact.style.position = "absolute";
      cardReact.style.left = `${x}px`;
      cardReact.style.top = `${y}px`;

      setActiveCardReact(cardReact);
    }
  }

  function dropCard(e: React.MouseEvent) {
    const gapContainer = e.target as HTMLDivElement;
    if (gapContainer.classList.contains(gapElements.GAP_CONTAINER)) {
      const gapReact = gapContainer.parentElement!;
      gapReact.style.display = "none";
      setTimeout(() => {
        gapReact.style.display = "";
      }, 1000)
    }

    if (activeCardReact) {
      gapContainer.style.outline = "";
      activeCardReact.style.position = ""
      activeCardReact.style.transition = "all 0.5s ease-in-out";
      activeCardReact.style.pointerEvents = "none";
      activeCardReact.style.left = "";
      activeCardReact.style.top = "";

      activeCardReact.addEventListener("transitionend", function removeTransition() {
        activeCardReact.style.transition = "";
        activeCardReact.style.pointerEvents = "";
        activeCardReact.removeEventListener("transitionend", removeTransition);
      });
      if (openedGapIndex !== null && activeCardReact.children[0].classList.contains(cardElements.CARD_CONTAINER)) {
        activeCardReact.classList.remove(cardStates.CARD_IN_PLAY);
        activeCardReact.classList.add(cardStates.CARD_IN_HAND);
        addCard(openedGapIndex);
      }
    }
    setActiveCardReact(null);
    dispatch({ type: reducerCases.SET_OPENED_GAP_INDEX, openedGapIndex: null });
  }

  function addCard(index: number) {
    const newCards = [...cards];
    const newPlayerCards = [...playerCards];

    let newCard = activeCard;
    if (cards.includes(activeCard)) {
      newCard = newCards.pop()!;
    } else if (playerCards.includes(activeCard)) {
      const index1 = playerCards.indexOf(activeCard);
      [newCard] = newPlayerCards.splice(index1, 1);
    }
    
    newPlayerCards.splice(index/2, 0, newCard);

    dispatch({
      type: reducerCases.SET_PLAYER_CARDS,
      playerCards: newPlayerCards,
    });
    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
  }

  function moveCard(e: React.MouseEvent) {
    const page = pageRef.current!;
    const menu = page.children[0]!;

    if (activeCardReact) {
      const halftWidth = activeCardReact.offsetWidth / 2;

      const minX = halftWidth;
      const minY = page.offsetTop + menu.clientHeight + halftWidth;
      const maxX = page.clientWidth - halftWidth;
      const maxY = page.offsetTop + page.clientHeight - halftWidth;
      const x = e.clientX;
      const y = e.clientY;
      activeCardReact.style.position = "absolute";

      if (x < minX) {
        activeCardReact.style.left = `${minX}px`;
      } else if (x > maxX) {
        activeCardReact.style.left = `${maxX}px`;
      } else {
        activeCardReact.style.left = `${x}px`;
      }

      if (y < minY) {
        activeCardReact.style.top = `${minY}px`;
      } else if (y > maxY) {
        activeCardReact.style.top = `${maxY}px`;
      } else {
        activeCardReact.style.top = `${y}px`;
      }

      checkCardOverPlayerCards(e.clientX, e.clientY);
    }
  }

  function checkCardOverPlayerCards(x: number, y: number) {
    const playerCardsContainer = document.getElementById(cardElements.CARDS_CONTAINER);

    if (playerCardsContainer) {
      const rect = playerCardsContainer.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        const firstElement = playerCardsContainer.children[0];
        const lastElement =
        playerCardsContainer.children[playerCardsContainer.children.length - 1];

        // Calculate which gap the card is closest to
        const containerWidth =
          lastElement.getBoundingClientRect().right -
          firstElement.getBoundingClientRect().left;
        const mouseX = x - firstElement.getBoundingClientRect().left;

        const totalGaps = playerCards.length + 1;
        const unitWidth = containerWidth / (playerCards.length + totalGaps);
        const unitsFromLeft = mouseX / unitWidth;
        const closestGapUnit = Math.round(unitsFromLeft / 2) * 2;
        const boundedIndex = Math.max(
          0,
          Math.min(closestGapUnit, playerCards.length * 2)
        );

        dispatch({
          type: reducerCases.SET_OPENED_GAP_INDEX,
          openedGapIndex: boundedIndex,
        });
      } else {
        dispatch({
          type: reducerCases.SET_OPENED_GAP_INDEX,
          openedGapIndex: null,
        });
      }
    }
  }

  return (
    <Container
      onMouseDown={(e) => grabCard(e)}
      onMouseUp={(e) => dropCard(e)}
      onMouseMove={(e) => moveCard(e)}
      ref={pageRef}
    >
      <Menu />
      <Board />
      <Deck />
    </Container>
  );
}

const Container = styled.div`
  background-color: rgb(0, 18, 51);
`;
