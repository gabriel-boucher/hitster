import { reducerCases } from "./Constants";

export interface PlayerInterface {
  socketId: string;
  name: string;
  cards: CardInterface[];
  tokens: TokenInterface[];
}

export interface CardInterface {
  id: string;
  song: string;
  artist: string;
  date: string;
  albumCover: string;
  hidden: boolean;
}

export interface TokenInterface {
  id: string;
}

export interface State {
  spotifyToken: string;
  players: Record<string, PlayerInterface>;
  activePlayer: string;
  cards: CardInterface[];
  activeCard: CardInterface;
  gapIndex: number | null;
}
export interface SetSpotifyTokenAction {
  type: reducerCases.SET_SPOTIFY_TOKEN;
  spotifyToken: string;
}

export interface SetPlayersAction {
  type: reducerCases.SET_PLAYERS;
  players: Record<string, PlayerInterface>;
}

export interface SetActivePlayer {
  type: reducerCases.SET_ACTIVE_PLAYER;
  activePlayer: string;
}

export interface SetCardsAction {
  type: reducerCases.SET_CARDS;
  cards: CardInterface[];
}

export interface SetActiveCardAction {
  type: reducerCases.SET_ACTIVE_CARD;
  activeCard: CardInterface;
}

export interface SetGapIndexAction {
  type: reducerCases.SET_GAP_INDEX;
  gapIndex: number | null;
}

export type Action =
  | SetSpotifyTokenAction
  | SetPlayersAction
  | SetActivePlayer
  | SetCardsAction
  | SetActiveCardAction
  | SetGapIndexAction;
