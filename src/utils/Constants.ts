export enum reducerCases {
  SET_SPOTIFY_TOKEN = "SET_SPOTIFY_TOKEN",
  SET_PLAYERS = "SET_PLAYERS",
  SET_ACTIVE_PLAYER = "SET_ACTIVE_PLAYER",
  SET_CARDS = "SET_CARDS",
  SET_ACTIVE_CARD = "SET_ACTIVE_CARD",
  SET_TOKENS = "SET_TOKENS",
}

export enum cardStates {
  CARD_IN_HAND = "card-in-hand",
  CARD_IN_PLAY = "card-in-play",
}

export enum cardElements {
  CARD_REACT = "card-react",
  CARD_CONTAINER = "card-container",
  CARDS_CONTAINER = "cards-container",
}

export const cardsFetched = [
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

export const playersFetched = [
  {
    socketId: "socketId1",
    name: "player1",
  },
  // {
  //   socketId: "socketId2",
  //   name: "player2",
  // },
  // {
  //   socketId: "socketId3",
  //   name: "player3",
  // },
  // {
  //   socketId: "socketId4",
  //   name: "player4",
  // },
];

