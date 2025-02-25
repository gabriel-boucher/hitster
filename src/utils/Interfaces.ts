import { reducerCases } from "./Constants";

export interface CardInterface {
  id: string
  song: string;
  artist: string;
  date: string;
  albumCover: string;
  inHand: boolean;
  hidden: boolean;
}

export interface PlayerInterface {
  socketId: string;
  name: string;
  cards: CardInterface[];
  tokens: number;
}



export interface State {
  socketId: string;
  spotifyToken: string;
  players: Map<string, PlayerInterface>;
  playerCards: CardInterface[];
  openedGapIndex: number | null;
  cards: CardInterface[];
}

export interface SetSocketIdAction {
  type: reducerCases.SET_SOCKET_ID;
  socketId: string;
}
export interface SetSpotifyTokenAction {
  type: reducerCases.SET_SPOTIFY_TOKEN;
  spotifyToken: string;
}

export interface SetPlayersAction {
  type: reducerCases.SET_PLAYERS;
  players: Map<string, PlayerInterface>;
}

export interface SetPlayerCardsAction {
  type: reducerCases.SET_PLAYER_CARDS;
  playerCards: CardInterface[];
}

export interface SetOpenedGapIndexAction {
  type: reducerCases.SET_OPENED_GAP_INDEX;
  openedGapIndex: number | null;
}

export interface SetCardsAction {
  type: reducerCases.SET_CARDS;
  cards: CardInterface[];
}

export type Action = SetSocketIdAction | SetSpotifyTokenAction | SetPlayersAction | SetPlayerCardsAction | SetOpenedGapIndexAction | SetCardsAction;