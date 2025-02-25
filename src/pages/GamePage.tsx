import styled from "styled-components";
import Menu from "../components/GamePage/Menu/Menu";
import Board from "../components/GamePage/Board/Board";
import Deck from "../components/GamePage/Deck/Deck";
import { useEffect, useRef, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";

export default function GamePage() {
  const [{ socketId, players, playerCards, openedGapIndex, cards }, dispatch] =
    useStateProvider();
  const [activeCard, setActiveCard] = useState<HTMLElement | null>(null);
  const pageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const newPlayers = new Map(players);
    newPlayers.set(socketId, { ...players.get(socketId)!, cards: playerCards });
    dispatch({ type: reducerCases.SET_PLAYERS, players: newPlayers });
  }, [playerCards]);

  function grabCard(e: React.MouseEvent) {
    const el = e.target as HTMLDivElement;
    const element = el.parentElement!;

    if (element.classList.contains("card-in-hand")) {
      const newPlayerCards = [...playerCards];
      for (let card of newPlayerCards) {
        if (card.id === element.id && card.hidden) {
          card.hidden = !card.hidden;
          // card.inHand = false;
          break;
        }
      }
      dispatch({
        type: reducerCases.SET_PLAYER_CARDS,
        playerCards: newPlayerCards,
      });
    }

    if (element.classList.contains("card-in-play")) {
      el.style.outline = "1px solid white";
      const x = e.clientX;
      const y = e.clientY;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActiveCard(element);
    }
  }

  function dropCard(e: React.MouseEvent) {
    const el = e.target as HTMLDivElement;
    const element = el.parentElement!;
    if (activeCard) {
      el.style.outline = "";
      element.style.transition = "all 0.5s ease-in-out";
      element.style.pointerEvents = "none";
      element.style.left = "";
      element.style.top = "";

      element.addEventListener("transitionend", function removeTransition() {
        element.style.transition = "";
        element.style.pointerEvents = "auto";
        element.removeEventListener("transitionend", removeTransition);
      });
    }
    if (openedGapIndex !== null) {
      addCard(openedGapIndex);
    }
    setActiveCard(null);
    dispatch({ type: reducerCases.SET_OPENED_GAP_INDEX, openedGapIndex: null });
  }

  function addCard(index: number) {
    const newCards = [...cards];

    const newCard = newCards.pop()!;
    newCard.inHand = true;
    newCard.hidden = true;

    const newPlayerCards = [...playerCards];
    newPlayerCards.splice(index, 0, newCard);

    dispatch({
      type: reducerCases.SET_PLAYER_CARDS,
      playerCards: newPlayerCards,
    });
    dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
  }

  function moveCard(e: React.MouseEvent) {
    const page = pageRef.current!;
    const menu = page.children[0]!;

    if (activeCard) {
      const halftWidth = activeCard.offsetWidth / 2;

      const minX = halftWidth;
      const minY = page.offsetTop + menu.clientHeight + halftWidth;
      const maxX = page.clientWidth - halftWidth;
      const maxY = page.offsetTop + page.clientHeight - halftWidth;
      const x = e.clientX;
      const y = e.clientY;
      activeCard.style.position = "absolute";

      if (x < minX) {
        activeCard.style.left = `${minX}px`;
      } else if (x > maxX) {
        activeCard.style.left = `${maxX}px`;
      } else {
        activeCard.style.left = `${x}px`;
      }

      if (y < minY) {
        activeCard.style.top = `${minY}px`;
      } else if (y > maxY) {
        activeCard.style.top = `${maxY}px`;
      } else {
        activeCard.style.top = `${y}px`;
      }

      checkCardOverPlayerCards(e.clientX, e.clientY);
    }
  }

  function checkCardOverPlayerCards(x: number, y: number) {
    const playerCardsElement = document.querySelector(".cards-container");

    if (playerCardsElement) {
      const rect = playerCardsElement.getBoundingClientRect();
      if (
        x >= rect.left &&
        x <= rect.right &&
        y >= rect.top &&
        y <= rect.bottom
      ) {
        const firstElement = playerCardsElement.children[0];
        const lastElement =
          playerCardsElement.children[playerCardsElement.children.length - 1];

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
