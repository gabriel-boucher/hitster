import { gameStates } from "./Constants";

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
  active: boolean;
  activePlayerId: string | null;
  playerId: string;
}

export interface GameInterface {
  gameState: gameStates;
  players: PlayerInterface[];
  activePlayer: PlayerInterface;
  items: (CardInterface | TokenInterface)[];
  activeCard: CardInterface;
}