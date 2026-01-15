import {RoomId} from "../room/RoomState.ts";
import {Player} from "../player/Player.ts";
import {Card} from "../item/Card.ts";
import {Token} from "../item/Token.ts";

export enum GameStatus {
  LOBBY = "LOBBY",
  PLAYING = "PLAYING",
  OVER = "OVER",
}

export type GameState = {
  id: RoomId;
  status: GameStatus;
  players: Player[],
  currentDeck: (Card|Token)[],
  currentCard: Card,
  currentPlayerIndex: number;
}