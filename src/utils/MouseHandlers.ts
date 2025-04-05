import { useCallback } from "react";
import { useStateProvider } from "./StateProvider";
import { reducerCases } from "./Constants";
import { CardInterface } from "./Interfaces";
import { TokenInterface } from "./Interfaces";
import { useMouseHandlersHelpers } from "./MouseHandlersHelpers";

export function useMouseHandlers(
  isDragging: boolean,
  setDragPosition: (position: { x: number; y: number }) => void,
  setIsDragging: (value: boolean) => void
) {
  const [{ players, activePlayer, items, activeCard }, dispatch] =
    useStateProvider();

  const {
    moveActiveCardTo,
    isActiveCardInBoard,
    isActiveCardInStack,
    getNewIndex,
  } = useMouseHandlersHelpers(isDragging);

  const handleMouseClick = useCallback(
    (clickToken: TokenInterface) => {
      const newItems = items.map((item) =>
        "activePlayerId" in item && item.id === clickToken.id
          ? { ...item, active: !item.active }
          : item
      );
      dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
    },
    [items]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, downCard: CardInterface) => {
      if (downCard.id === activeCard.id) {
        if (isActiveCardInStack()) {
          const newItems = moveActiveCardTo("board");
          dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
        }
        setIsDragging(true);
        setDragPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [items, activeCard]
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
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      if (isActiveCardInBoard()) {
        const newItems = moveActiveCardTo(null);
        dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      }
      setIsDragging(false);
      setDragPosition({ x: 0, y: 0 });
    }
  }, [isDragging, items, activeCard]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      const newItems = moveActiveCardTo("board");
      dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
    } else {
      const newItems = items.map((item) =>
        "activePlayerId" in item &&
        item.playerId === players[0].socketId &&
        item.active === false
          ? { ...item, activePlayerId: null }
          : item
      );

      dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
    }
  }, [isDragging, items, activeCard]);

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, overCard: CardInterface) => {
      if (isDragging && overCard.id !== activeCard.id) {
        const newItems = items.filter((item) => item.id !== activeCard.id);
        const newIndex = getNewIndex(e, newItems, overCard);

        newItems.splice(newIndex, 0, {
          ...activeCard,
          playerId: activePlayer.socketId,
        });

        dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      } else if (!isDragging && activePlayer.socketId !== players[0].socketId) {
        const tokenIndex =
          items.length -
          1 -
          [...items]
            .reverse()
            .findIndex(
              (item) =>
                "activePlayerId" in item &&
                item.playerId === players[0].socketId &&
                item.active === false
            );

        if (tokenIndex === items.length) return;

        const newItems = [...items];
        const [activeToken] = newItems.splice(tokenIndex, 1);
        const newIndex = getNewIndex(e, newItems, overCard);

        newItems.splice(newIndex, 0, {
          ...activeToken,
          activePlayerId: activePlayer.socketId,
        });

        handleTwoAdjacentTokens(newItems);

        dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      }
    },
    [isDragging, players, activePlayer, items, activeCard, dispatch]
  );

  const handleMouseOverToken = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, overToken: TokenInterface) => {
      if (isDragging) {
        const newItems = items.filter((item) => item.id !== activeCard.id);
        const newIndex = getNewIndex(e, newItems, overToken);

        newItems.splice(newIndex, 0, {
          ...activeCard,
          playerId: activePlayer.socketId,
        });

        dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      } else if (!isDragging) {
        const newItems = items.map((item) =>
          "activePlayerId" in item &&
          item.id !== overToken.id &&
          item.active === false &&
          item.playerId === players[0].socketId
            ? { ...item, activePlayerId: null }
            : item
        );
        dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      }
    },
    [items]
  );

  function handleTwoAdjacentTokens(newItems: (CardInterface | TokenInterface)[]) {
    let hasChanged = false;
  
    const activeItems = newItems.filter((item) =>
      "song" in item
        ? item.playerId === activePlayer.socketId
        : item.activePlayerId === activePlayer.socketId
    );
  
    for (let i = 0; i < activeItems.length - 1; i++) {
      const current = activeItems[i];
      const next = activeItems[i + 1];
  
      if ("activePlayerId" in current && "activePlayerId" in next) {
        const updatedCurrent = { ...current, active: false, activePlayerId: null };
  
        const currentIndex = newItems.findIndex((item) => item.id === current.id);
        if (currentIndex !== -1) {
          newItems[currentIndex] = updatedCurrent;
          hasChanged = true; // Mark that we made a change
        }
      }
    }
  
    if (hasChanged) {
      dispatch({
        type: reducerCases.SET_ITEMS,
        items: newItems,
      });
    }
  };

  return {
    handleMouseClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleMouseOver,
    handleMouseOverToken,
    handleTwoAdjacentTokens,
  };
}
