import { reducerCases } from "./Constants";

export interface CardInterface {
  song: string;
  artist: string;
  date: string;
  albumCover: string;
  inHand: boolean;
  hidden: boolean;
}

export interface PlayerInterface {
  name: string;
  cards: CardInterface[];
  tokens: number;
}



export interface State {
  spotifyToken: string;
  players: PlayerInterface[];
  cards: CardInterface[];
}

export interface SetSpotifyTokenAction {
  type: reducerCases.SET_SPOTIFY_TOKEN;
  spotifyToken: string;
}

export interface SetPlayersAction {
  type: reducerCases.SET_PLAYERS;
  players: PlayerInterface[];
}

export interface SetCardsAction {
  type: reducerCases.SET_CARDS;
  cards: CardInterface[];
}

export type Action = SetSpotifyTokenAction | SetPlayersAction | SetCardsAction;