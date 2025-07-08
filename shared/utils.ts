import { CardInterface, PlayerInterface, TokenInterface } from "./Interfaces";

export function isCard(item: CardInterface | TokenInterface) {
  return "song" in item;
}

export function isToken(item: CardInterface | TokenInterface) {
  return "activePlayerId" in item;
}

export function getActiveCard(items: (CardInterface | TokenInterface)[]) {
  return items.filter((item): item is CardInterface => isCard(item) && item.active)[0];
}

export function getActivePlayerId(players: PlayerInterface[]) {
  return players.filter((player) => player.active)[0].socketId;
}
