import { useCallback } from "react";
import { useStateProvider } from "./StateProvider";
import { reducerCases } from "./Constants";
import { CardInterface } from "./Interfaces";
import { TokenInterface } from "./Interfaces";
import { useMouseHandlersHelpers } from "./MouseHandlersHelpers";
import {
  isToken,
  getActiveItems,
  moveActiveCardToBoard,
  moveActiveCardToStack,
  setActiveToken,
  getPlayerToken,
  moveTokenToPlayer,
  moveTokensWithWrongPositionToPlayers,
} from "./Items";

export function useMouseHandlers(
  isDragging: boolean,
  setDragPosition: (position: { x: number; y: number }) => void,
  setIsDragging: (value: boolean) => void
) {
  const [{ players, activePlayer, items, activeCard }, dispatch] =
    useStateProvider();

  const {
    isActiveCardInBoard,
    isActiveCardInStack,
    isOverActiveCard,
    getNewIndex,
  } = useMouseHandlersHelpers(isDragging);

  const handleTokenLogic = useCallback(
    (newItems: (CardInterface | TokenInterface)[]) => {
      const activeItems = getActiveItems(newItems, activePlayer.socketId);

      for (let i = 0; i < activeItems.length - 1; i++) {
        const current = activeItems[i];
        const next = activeItems[i + 1];

        let active;

        if (isToken(current) && isToken(next)) {
          active = current.active ? next : current;
        } else if (
          (isToken(current) && activeCard.id === next.id) ||
          (isToken(next) && activeCard.id === current.id)
        ) {
          active = isToken(current) ? current : next;
        }

        if (active) {
          moveTokensWithWrongPositionToPlayers(newItems, active);
        }
      }
    },
    [activePlayer, activeCard]
  );

  const handleMouseClick = useCallback(
    (clickToken: TokenInterface) => {
      const newItems = setActiveToken([...items], clickToken);
      dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
    },
    [items, dispatch]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, downCard: CardInterface) => {
      if (downCard.id === activeCard.id) {
        setIsDragging(true);
        setDragPosition({
          x: e.clientX,
          y: e.clientY,
        });
        if (isActiveCardInStack()) {
          const newItems = moveActiveCardToBoard([...items], activeCard);
          dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
        }
      }
    },
    [
      items,
      activeCard,
      setIsDragging,
      setDragPosition,
      isActiveCardInStack,
      dispatch,
    ]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        requestAnimationFrame(() => {
          setDragPosition({
            x: e.clientX,
            y: e.clientY,
          });
        });
      }
    },
    [isDragging, setDragPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      setDragPosition({ x: 0, y: 0 });
      if (isActiveCardInBoard()) {
        const newItems = moveActiveCardToStack([...items], activeCard);
        dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      }
    }
  }, [
    isDragging,
    items,
    activeCard,
    setIsDragging,
    setDragPosition,
    isActiveCardInBoard,
    dispatch,
  ]);

  const handleMouseLeave = useCallback(() => {
    let newItems;
    if (isDragging) {
      newItems = moveActiveCardToBoard([...items], activeCard);
    } else {
      newItems = moveTokenToPlayer([...items], players[0].socketId);
    }

    dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
  }, [isDragging, items, activeCard, players, dispatch]);

  const handleMouseDraggingOver = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      over: CardInterface | TokenInterface
    ) => {
      if (!isOverActiveCard(over)) {
        const newItems = items.filter((item) => item.id !== activeCard.id);
        const newIndex = getNewIndex(e, newItems, over);

        newItems.splice(newIndex, 0, {
          ...activeCard,
          playerId: activePlayer.socketId,
        });

        handleTokenLogic(newItems);

        dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      }
    },
    [
      activePlayer,
      items,
      activeCard,
      isOverActiveCard,
      getNewIndex,
      handleTokenLogic,
      dispatch,
    ]
  );

  const handleMouseOver = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      over: CardInterface | TokenInterface
    ) => {
      if (activePlayer.socketId !== players[0].socketId) {
        const result = getPlayerToken([...items], players[0].socketId);
        if (!result) return;
        const [newItems, activeToken] = result;
        const newIndex = getNewIndex(e, newItems, over);

        newItems.splice(newIndex, 0, {
          ...activeToken,
          activePlayerId: activePlayer.socketId,
        });

        handleTokenLogic(newItems);

        dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      }
    },
    [players, activePlayer, items, getNewIndex, handleTokenLogic, dispatch]
  );

  return {
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleMouseDraggingOver,
    handleMouseOver,
    handleTokenLogic,
  };
}
