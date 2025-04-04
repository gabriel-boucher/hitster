import { reducerCases } from "./Constants";

export interface PlayerInterface {
  socketId: string;
  name: string;
}

export interface CardInterface {
  id: string;
  song: string;
  artist: string;
  date: string;
  albumCover: string;
  playerId: string | null;
}

export interface TokenInterface {
  id: string;
  playerId: string;
}

export interface State {
  spotifyToken: string;
  players: PlayerInterface[];
  activePlayer: PlayerInterface;
  cards: CardInterface[];
  activeCard: CardInterface;
  activeCardsWith: number;
  tokens: TokenInterface[];
}
export interface SetSpotifyTokenAction {
  type: reducerCases.SET_SPOTIFY_TOKEN;
  spotifyToken: string;
}

export interface SetPlayersAction {
  type: reducerCases.SET_PLAYERS;
  players: PlayerInterface[];
}

export interface SetActivePlayer {
  type: reducerCases.SET_ACTIVE_PLAYER;
  activePlayer: PlayerInterface;
}

export interface SetCardsAction {
  type: reducerCases.SET_CARDS;
  cards: CardInterface[];
}

export interface SetActiveCardAction {
  type: reducerCases.SET_ACTIVE_CARD;
  activeCard: CardInterface;
}
export interface SetTokensAction {
  type: reducerCases.SET_TOKENS;
  tokens: TokenInterface[];
}

export type Action =
  | SetSpotifyTokenAction
  | SetPlayersAction
  | SetActivePlayer
  | SetCardsAction
  | SetActiveCardAction
  | SetTokensAction;
