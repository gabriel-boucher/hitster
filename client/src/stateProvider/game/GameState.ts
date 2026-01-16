import {GameStatus} from "../../type/game/GameState.ts";
import {Card} from "../../type/item/Card.ts";
import {Token} from "../../type/item/Token.ts";

export interface GameState {
  gameStatus: GameStatus;
  items: (Card | Token)[];
  isDragging: boolean;
}