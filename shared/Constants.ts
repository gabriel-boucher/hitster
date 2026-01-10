import { GameInterface } from "./interfaces";

export enum socketEvents {
  JOIN_ROOM = "join-room",
  CHANGE_PLAYER_NAME = "change-player-name",
  CHANGE_PLAYER_COLOR = "change-player-color",
  REMOVE_PLAYER = "remove-player",
  START_GAME = "start-game",
  NEXT_TURN = "next-turn",
  UPDATE_GAME_STATE = "update-game-state",
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
  playlists: []
};

export const PLAYER_COLORS = [
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