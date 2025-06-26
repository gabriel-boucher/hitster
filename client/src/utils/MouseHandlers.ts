import { useCallback } from "react";
import { useStateProvider } from "./StateProvider";
import { CardInterface, TokenInterface } from "@shared/Interfaces";
import { socketEvents } from "@shared/Constants";
import { useMouseHandlersHelpers } from "./MouseHandlersHelpers";
import {
  getActiveItems,
  moveActiveCardToBoard,
  moveActiveCardToStack,
  setActiveToken,
  getPlayerToken,
  moveTokenToPlayer,
  moveTokensWithWrongPositionToPlayers,
} from "./ItemsManipulation";
import { isToken } from "@shared/utils";
import { reducerCases } from "./Constants";

export default function useMouseHandlers(
  setDragPosition: (position: { x: number; y: number }) => void,
) {
  const [
    { socket, gameState, players, activePlayer, items, activeCard, isDragging }, dispatch
  ] = useStateProvider();

  const {
    isActiveCardInBoard,
    isActiveCardInStack,
    isOverActiveCard,
    getNewIndex,
  } = useMouseHandlersHelpers();

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
      socket.emit(socketEvents.UPDATE_GAME_STATE, {
        gameState,
        players,
        activePlayer,
        items: newItems,
        activeCard,
      });
    },
    [socket, gameState, players, activePlayer, items, activeCard]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, downCard: CardInterface) => {
      if (
        socket.id === activePlayer.socketId &&
        downCard.id === activeCard.id
      ) {
        dispatch({ type: reducerCases.SET_IS_DRAGGING, isDragging: true });
        setDragPosition({
          x: e.clientX,
          y: e.clientY,
        });
        if (isActiveCardInStack()) {
          const newItems = moveActiveCardToBoard([...items], activeCard);
          socket.emit(socketEvents.UPDATE_GAME_STATE, {
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
      dispatch,
      setDragPosition,
      isActiveCardInStack,
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
      dispatch({ type: reducerCases.SET_IS_DRAGGING, isDragging: false });
      setDragPosition({ x: 0, y: 0 });
      if (isActiveCardInBoard()) {
        const newItems = moveActiveCardToStack([...items], activeCard);
        socket.emit(socketEvents.UPDATE_GAME_STATE, {
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
    dispatch,
    setDragPosition,
    isActiveCardInBoard,
  ]);

  const handleMouseLeave = useCallback(() => {
    if (!socket.id) return;
    let newItems;
    if (isDragging) {
      newItems = moveActiveCardToBoard([...items], activeCard);
    } else {
      newItems = moveTokenToPlayer([...items], socket.id);
    }

    socket.emit(socketEvents.UPDATE_GAME_STATE, {
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

        socket.emit(socketEvents.UPDATE_GAME_STATE, {
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

        socket.emit(socketEvents.UPDATE_GAME_STATE, {
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
