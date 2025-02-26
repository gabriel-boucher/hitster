export enum reducerCases {
  SET_SOCKET_ID = "SET_SOCKET_ID",
  SET_SPOTIFY_TOKEN = "SET_SPOTIFY_TOKEN",
  SET_PLAYERS = "SET_PLAYERS",
  SET_PLAYERS_TURN = "SET_PLAYERS_TURN",
  SET_PLAYER_CARDS = "SET_PLAYER_CARDS",
  SET_OPENED_GAP_INDEX = "SET_OPENED_GAP_INDEX",
  SET_CARDS = "SET_CARDS",
  SET_ACTIVE_CARD = "SET_ACTIVE_CARD",
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

export enum gapElements {
  GAP_REACT = "gap-react",
  GAP_CONTAINER = "gap-container",
}