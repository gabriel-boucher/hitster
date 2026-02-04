import {Card} from "../client/src/type/item/Card";
import {Token} from "../client/src/type/item/Token";

export function isCard(item: Card | Token) {
  return item.type === "card";
}

export function isToken(item: Card | Token) {
  return item.type === "token";
}
