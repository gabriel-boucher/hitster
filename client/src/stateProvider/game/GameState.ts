import {GameStatus} from "../../type/game/GameState.ts";
import {Card, CardId} from "../../type/item/Card.ts";
import {Token} from "../../type/item/Token.ts";
import {PlayerId} from "../../type/player/Player.ts";
import {ItemStatus} from "../../type/item/ItemStatus.ts";

export interface GameState {
  gameStatus: GameStatus;
  items: (Card | Token)[];
  currentCardId: CardId;
  currentCardStatus: ItemStatus;
  currentPlayerId: PlayerId;
}