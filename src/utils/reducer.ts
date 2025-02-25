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
const cardsInfo: CardInterface[] = cardsFetched.map((card, index) => ({
  ...card,
  id: index.toString(),
  inHand: false,
  hidden: false,
}));

const playersInfo = new Map<string, PlayerInterface>([
  [
    "socketId1",
    { socketId: "socketId1", name: "player1", cards: [], tokens: 2 },
  ],
  // ["socketId2", { socketId: "socketId2", name: "player2", cards: [], tokens: 2 }],
  // ["socketId3", { socketId: "socketId3", name: "player3", cards: [], tokens: 2 }],
  // ["socketId4", { socketId: "socketId4", name: "player4", cards: [], tokens: 2 }],
]);
playersInfo.forEach((value: PlayerInterface) => {
  const initialCard = { ...cardsInfo.pop()!, inHand: true, hidden: false };
  value.cards.push(initialCard);
});

export const initialState = {
  socketId: "socketId1",
  spotifyToken: "",
  players: playersInfo,
  playerCards: playersInfo.get("socketId1")!.cards,
  openedGapIndex: null,
  cards: cardsInfo,
};

export const defaultDispatch: Dispatch<Action> = () => {};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case reducerCases.SET_SOCKET_ID: {
      return {
        ...state,
        socketId: action.socketId,
      };
    }
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
    case reducerCases.SET_PLAYER_CARDS: {
      return {
        ...state,
        playerCards: action.playerCards,
      };
    }
    case reducerCases.SET_OPENED_GAP_INDEX: {
      return {
        ...state,
        openedGapIndex: action.openedGapIndex,
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
