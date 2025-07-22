import { CardInterface, PlayerInterface } from "./Interfaces";

export enum socketEvents {
  JOIN_ROOM = "join-room",
  START_GAME = "start-game",
  NEXT_TURN = "next-turn",
  UPDATE_GAME_STATE = "update-game-state",
}

export enum gameStates {
  LOBBY = "LOBBY",
  PLAYING = "PLAYING",
  OVER = "OVER",
}

export const initialGameState = {
  gameState: gameStates.LOBBY,
  players: [],
  activePlayer: {} as PlayerInterface,
  items: [],
};

export const PLAYERS_IMG = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "black",
  "white",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "teal",
  "navy",
  "maroon",
  "olive",
  "gold",
  "silver"
];