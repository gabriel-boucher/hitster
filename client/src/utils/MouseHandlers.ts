import { useCallback } from "react";
import { useStateProvider } from "./StateProvider";
// import { reducerCases } from "./Constants";
import { CardInterface, TokenInterface } from "../../../Interfaces";
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
  const [
    { socket, gameState, players, activePlayer, items, activeCard },
    // dispatch,
  ] = useStateProvider();

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
      // dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
      socket.emit("updateGameState", {
        gameState,
        players,
        activePlayer,
        items: newItems,
        activeCard,
      });
    },
    [socket, gameState, players, activePlayer, items, activeCard
      // dispatch,
    ]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, downCard: CardInterface) => {
      if (
        socket.id === activePlayer.socketId &&
        downCard.id === activeCard.id
      ) {
        setIsDragging(true);
        setDragPosition({
          x: e.clientX,
          y: e.clientY,
        });
        if (isActiveCardInStack()) {
          const newItems = moveActiveCardToBoard([...items], activeCard);
          // dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
          socket.emit("updateGameState", {
            gameState,
            players,
            activePlayer,
            items: newItems,
            activeCard,
          });
        }
      }
    },
    [
      socket,
      gameState,
      players,
      activePlayer,
      items,
      activeCard,
      setIsDragging,
      setDragPosition,
      isActiveCardInStack,
      // dispatch,
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
        // dispatch({ type: reducerCases.SET_ITEMS, items: newItems });
        socket.emit("updateGameState", {
          gameState,
          players,
          activePlayer,
          items: newItems,
          activeCard,
        });
      }
    }
  }, [
    isDragging,
    socket,
    gameState,
    players,
    activePlayer,
    items,
    activeCard,
    setIsDragging,
    setDragPosition,
    isActiveCardInBoard,
    // dispatch,
  ]);

  const handleMouseLeave = useCallback(() => {
    if (!socket.id) return;
    let newItems;
    if (isDragging) {
      newItems = moveActiveCardToBoard([...items], activeCard);
    } else {
      newItems = moveTokenToPlayer([...items], socket.id);
    }

    // dispatch({ type: reducerCases.SET_ITEMS, items: newItems });

    socket.emit("updateGameState", {
      gameState,
      players,
      activePlayer,
      items: newItems,
      activeCard,
    });
  }, [
    isDragging,
    socket,
    gameState,
    players,
    activePlayer,
    items,
    activeCard,
    // dispatch,
  ]);

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

        // dispatch({ type: reducerCases.SET_ITEMS, items: newItems });

        socket.emit("updateGameState", {
          gameState,
          players,
          activePlayer,
          items: newItems,
          activeCard,
        });
      }
    },
    [
      socket,
      gameState,
      players,
      activePlayer,
      items,
      activeCard,
      isOverActiveCard,
      getNewIndex,
      handleTokenLogic,
      // dispatch,
    ]
  );

  const handleMouseOver = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      over: CardInterface | TokenInterface
    ) => {
      if (!socket.id) return;
      if (activePlayer.socketId !== socket.id) {
        const result = getPlayerToken([...items], socket.id);
        if (!result) return;
        const [newItems, activeToken] = result;
        const newIndex = getNewIndex(e, newItems, over);

        newItems.splice(newIndex, 0, {
          ...activeToken,
          activePlayerId: activePlayer.socketId,
        });

        handleTokenLogic(newItems);

        // dispatch({ type: reducerCases.SET_ITEMS, items: newItems });

        socket.emit("updateGameState", {
          gameState,
          players,
          activePlayer,
          items: newItems,
          activeCard,
        });
      }
    },
    [
      socket,
      gameState,
      players,
      activePlayer,
      items,
      activeCard,
      getNewIndex,
      handleTokenLogic,
      // dispatch,
    ]
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
