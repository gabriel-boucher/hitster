import { GameInterface } from "./Interfaces";

export enum socketEvents {
  JOIN_ROOM = "join-room",
  START_GAME = "start-game",
  NEXT_TURN = "next-turn",
  UPDATE_GAME_STATE = "update-game-state",
  ERROR = "error",
}

export enum gameStates {
  LOBBY = "LOBBY",
  PLAYING = "PLAYING",
  OVER = "OVER",
}

export const initialGameState : GameInterface = {
  gameState: gameStates.LOBBY,
  players: [],
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