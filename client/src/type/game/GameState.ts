import {RoomId} from "../room/RoomState.ts";
import {Player, PlayerId} from "../player/Player.ts";
import {Card, CardId} from "../item/Card.ts";
import {Token} from "../item/Token.ts";
import {ItemStatus} from "../item/ItemStatus.ts";

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
  currentCardId: CardId,
  currentCardStatus: ItemStatus,
  currentPlayerId: PlayerId;
}