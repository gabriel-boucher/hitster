import { CardInterface, TokenInterface } from "./Interfaces";

export function isCard(item: CardInterface | TokenInterface) {
  return "song" in item;
}

export function isToken(item: CardInterface | TokenInterface) {
  return "activePlayerId" in item;
}

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

export function moveActiveCardToBoard(items: (CardInterface | TokenInterface)[], activeCard: CardInterface) {
  const newItems = items.map((item) =>
    isCard(item) && item.id === activeCard.id ? { ...item, playerId: "board" } : item
  );

  return newItems;
}

export function moveActiveCardToStack(items: (CardInterface | TokenInterface)[], activeCard: CardInterface) {
  const newItems = items.map((item) =>
    isCard(item) && item.id === activeCard.id ? { ...item, playerId: null } : item
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
