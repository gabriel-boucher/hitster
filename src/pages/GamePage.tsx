import styled from "styled-components";
import Menu from "../components/GamePage/Menu/Menu";
import Board from "../components/GamePage/Board/Board";
import Deck from "../components/GamePage/Deck/Deck";
import { useEffect, useState } from "react";
import { CardInterface } from "../Interfaces";

const cardsFetched = [
  {
    song: "Starlight",
    artist: "Muse",
    date: "2006",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
  },
  {
    song: "Supermassive Black Hole",
    artist: "Muse",
    date: "2006",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b27328933b808bfb4cbbd0385400",
  },
  {
    song: "What's My Age Again?",
    artist: "blink-182",
    date: "1999",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b2736da502e35a7a3e48de2b0f74",
  },
  {
    song: "When I Come Around",
    artist: "Green Day",
    date: "1994",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273db89b08034de626ebee6823d",
  },
  {
    song: "Dreams - 2004 Remaster",
    artist: "Fleetwood Mac",
    date: "1977",
    albumCover:
      "https://i.scdn.co/image/ab67616d0000b273e52a59a28efa4773dd2bfe1b",
  },
];

export default function GamePage() {
  const [cards, setCards] = useState<CardInterface[]>(cardsFetched as CardInterface[]);
  const [initialCard, setInitialCard] = useState<CardInterface>(cards[0]);

  useEffect(() => {
    if (cards.length > 1) {
      setCards(cards.slice(1, -1));
    }
  }, []);

  return (
    <Container>
      <Menu/>
      <Board cards={cards}/>
      <Deck initialCard={initialCard}/>
    </Container>
  );
}

const Container = styled.div`
  background-color: rgb(0, 18, 51);
`;
