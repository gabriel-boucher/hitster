import {Card} from "../item/Card.ts";
import {Token} from "../item/Token.ts";

export type PlayerDeck = {
  cards: Card[];
  token: Token[];
}