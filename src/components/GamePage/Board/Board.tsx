import styled from "styled-components";
import Card from "../Deck/Card";
import React, { ReactElement, useRef, useState } from "react";
import { CardInterface } from "../../../Interfaces";

export default function Board({cards}: {cards: CardInterface[]}) {
  const [activeCard, setActiveCard] = useState<HTMLElement | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  function grabCard(e: React.MouseEvent) {
    const element = e.target as HTMLDivElement;
    const board = boardRef.current;

    if (element.classList.contains("card-in-play") && board) {
      const x = e.clientX;
      const y = e.clientY;

      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      setActiveCard(element);
    }
  }

  function dropCard(e: React.MouseEvent) {
    const element = e.target as HTMLDivElement;
    const board = boardRef.current;
    if (activeCard && board) {
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
    setActiveCard(null);
  }

  function moveCard(e: React.MouseEvent) {
    const board = boardRef.current;
    
    if (activeCard && board) {
      const minX = board.offsetLeft + 64;
      const minY = board.offsetTop + 64;
      const maxX = board.offsetLeft + board.clientWidth - 64;
      const maxY = board.offsetTop + board.clientHeight - 64;
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
    }
  }

  const board: ReactElement[] = [];
  cards.forEach((card) =>{
    card.inHand = false;
    board.push(
      <Card
        key={card.song}
        card={card}
      />
    )
  }
  );

  return (
    <Container
      onMouseDown={(e) => grabCard(e)}
      onMouseUp={(e) => dropCard(e)}
      onMouseMove={(e) => moveCard(e)}
      ref={boardRef}
    >
      {board}
    </Container>
  );
}

const Container = styled.div`
  height: 70vh;
`;
