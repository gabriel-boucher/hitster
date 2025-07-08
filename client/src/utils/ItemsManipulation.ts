import { CardInterface, TokenInterface } from "@shared/Interfaces";
import { isCard, isToken } from "@shared/utils";

export function getActiveItems(
  items: (CardInterface | TokenInterface)[],
  activePlayerId: string
) {
  const activeItems = items.filter((item) =>
    isCard(item)
      ? item.playerId === activePlayerId
      : item.activePlayerId === activePlayerId
  );

  return activeItems;
}

export function moveActiveCardToBoard(
  items: (CardInterface | TokenInterface)[]
) {
  const newItems = items.map((item) =>
    isCard(item) && item.active
      ? { ...item, playerId: "board" }
      : item
  );

  return newItems;
}

export function moveActiveCardToStack(
  items: (CardInterface | TokenInterface)[]
) {
  const newItems = items.map((item) =>
    isCard(item) && item.active
      ? { ...item, playerId: null }
      : item
  );

  return newItems;
}

export function setActiveToken(
  items: (CardInterface | TokenInterface)[],
  clickToken: TokenInterface
) {
  const newItems = items.map((item) =>
    isToken(item) && item.id === clickToken.id
      ? { ...item, active: !item.active }
      : item
  );
  return newItems;
}

export function getPlayerToken(
  items: (CardInterface | TokenInterface)[],
  playerId: string
):
  | [(CardInterface | TokenInterface)[], CardInterface | TokenInterface]
  | undefined {
  const tokenIndex = items.findLastIndex(
    (item) => isToken(item) && item.playerId === playerId && !item.active
  );

  if (tokenIndex === -1) return;

  const [activeToken] = items.splice(tokenIndex, 1);

  return [items, activeToken];
}

export function moveTokenToPlayer(
  items: (CardInterface | TokenInterface)[],
  playerId: string
) {
  const newItems = items.map((item) =>
    isToken(item) && item.playerId === playerId && !item.active
      ? { ...item, activePlayerId: null }
      : item
  );
  return newItems;
}

export function moveTokensWithWrongPositionToPlayers(
  items: (CardInterface | TokenInterface)[],
  active: CardInterface | TokenInterface
) {
  items.forEach((item) => {
    if (isToken(item) && item.id === active.id) {
      item.active = false;
      item.activePlayerId = null;
    }
  });
}
