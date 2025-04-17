import { CardInterface, TokenInterface } from "./Interfaces";

export function isCard(item: CardInterface | TokenInterface) {
  return "song" in item;
}

export function isToken(item: CardInterface | TokenInterface) {
  return "activePlayerId" in item;
}
