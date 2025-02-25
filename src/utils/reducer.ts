import { Action, CardInterface, PlayerInterface, State } from "./Interfaces";
import { reducerCases } from "./Constants";
import { Dispatch } from "react";

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
const cardsInfo: CardInterface[] = cardsFetched.map((card) => ({
  ...card,
  inHand: false,
  hidden: false,
}));

const playersInfo: PlayerInterface[] = [
  { name: "Player 1", cards: [], tokens: 2 },
];
playersInfo.forEach((player) => {
  const initialCard = { ...cardsInfo.pop()!, inHand: true, hidden: false };
  player.cards.push(initialCard);
});

export const initialState = {
  spotifyToken: "",
  players: playersInfo,
  cards: cardsInfo,
};

export const defaultDispatch: Dispatch<Action> = () => {};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerCases.SET_SPOTIFY_TOKEN: {
      return {
        ...state,
        spotifyToken: action.spotifyToken,
      };
    }
    case reducerCases.SET_PLAYERS: {
      return {
        ...state,
        players: action.players,
      };
    }
    case reducerCases.SET_CARDS: {
      return {
        ...state,
        cards: action.cards,
      };
    }
    default:
      return state;
  }
};
