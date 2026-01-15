import { GameInterface } from "./interfaces";
import {GameStatus} from "../client/src/type/game/GameState";

export enum socketEvents {
  JOIN_ROOM = "join-room",
  CHANGE_PLAYER_NAME = "change-player-name",
  CHANGE_PLAYER_COLOR = "change-player-color",
  REMOVE_PLAYER = "remove-player",
  START_GAME = "start-game",
  NEXT_TURN = "next-turn",
  UPDATE_GAME_STATE = "update-game-state",
}

export enum gameStatus {
  LOBBY = "LOBBY",
  PLAYING = "PLAYING",
  OVER = "OVER",
}

export const initialGameState : GameInterface = {
  gameStatus: GameStatus.LOBBY,
  players: [],
  items: [],
  playlists: []
};