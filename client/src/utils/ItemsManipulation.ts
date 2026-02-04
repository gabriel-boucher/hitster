import { isCard, isToken } from "@shared/utils";
import {Card} from "../type/item/Card.ts";
import {Token} from "../type/item/Token.ts";
import {PlayerId} from "../type/player/Player.ts";

export function moveActiveCardToBoard(
  items: (Card | Token)[]
) {
  const newItems = items.map((item) =>
    isCard(item) && item.active
      ? { ...item, playerId: "board" }
      : item
  );

  return newItems;
}

export function moveActiveCardToStack(
  items: (Card | Token)[]
) {
  const newItems = items.map((item) =>
    isCard(item) && item.active
      ? { ...item, playerId: null }
      : item
  );

  return newItems;
}

export function setActiveToken(
  items: (Card | Token)[],
  clickToken: Token
) {
  const newItems = items.map((item) =>
    isToken(item) && item.id === clickToken.id
      ? { ...item, active: !item.active }
      : item
  );
  return newItems;
}

export function getPlayerToken(
  items: (Card | Token)[],
  playerId: PlayerId
):
  | [(Card | Token)[], Card | Token]
  | undefined {
  const tokenIndex = items.findLastIndex(
    (item) => isToken(item) && item.playerId === playerId && !item.active
  );

  if (tokenIndex === -1) return;

  const [activeToken] = items.splice(tokenIndex, 1);

  return [items, activeToken];
}

export function moveTokenToPlayer(
  items: (Card | Token)[],
  playerId: PlayerId
) {
  const newItems = items.map((item) =>
    isToken(item) && item.playerId === playerId && !item.active
      ? { ...item, activePlayerId: null }
      : item
  );
  return newItems;
}

export function moveTokensWithWrongPositionToPlayers(
  items: (Card | Token)[],
  active: Card | Token
) {
  items.forEach((item) => {
    if (isToken(item) && item.id === active.id) {
      item.active = false;
      item.activePlayerId = null;
    }
  });
}
