import { useCallback, useRef } from "react";
import { CardInterface, TokenInterface } from "@shared/interfaces";
import { socketEvents } from "@shared/constants";
import { useMouseHandlersHelpers } from "./useMouseHandlersHelpers";
import {
  getActiveItems,
  moveActiveCardToBoard,
  moveActiveCardToStack,
  setActiveToken,
  getPlayerToken,
  moveTokenToPlayer,
  moveTokensWithWrongPositionToPlayers,
} from "../utils/itemsManipulation";
import { getActiveCard, getActivePlayerId, isCard, isToken } from "@shared/utils";
import { reducerCases } from "../utils/constants";
import {useConnectionStateProvider} from "../stateProvider/connection/ConnectionStateProvider.tsx";
import {useRoomStateProvider} from "../stateProvider/room/RoomStateProvider.tsx";
import {useGameStateProvider} from "../stateProvider/game/GameStateProvider.tsx";

export default function useMouseHandlers(
  activeCardWidth: number,
  setDragPosition: (position: { x: number; y: number }) => void,
) {
  const [{ socket }] = useConnectionStateProvider();
  const [{ players }] = useRoomStateProvider();
  const [{ gameStatus, items, isDragging }, dispatch] = useGameStateProvider();

  const lastEmitTime = useRef(0);

  const {
    isActiveCardInBoard,
    isActiveCardInStack,
    isOverActiveCard,
    getNewIndex,
  } = useMouseHandlersHelpers();

  const handleTokenLogic = useCallback(
    (newItems: (CardInterface | TokenInterface)[]) => {
      const activeItems = getActiveItems(newItems, getActivePlayerId(players));

      for (let i = 0; i < activeItems.length - 1; i++) {
        const current = activeItems[i];
        const next = activeItems[i + 1];

        let active;

        if (isToken(current) && isToken(next)) {
          active = current.active ? next : current;
        } else if (
          (isToken(current) && isCard(next) && next.active) ||
          (isToken(next) && isCard(current) && current.active)
        ) {
          active = isToken(current) ? current : next;
        }

        if (active) {
          moveTokensWithWrongPositionToPlayers(newItems, active);
        }
      }
    },
    [players]
  );

  const handleMouseClick = useCallback(
    (clickToken: TokenInterface) => {
      if (socket.id === getActivePlayerId(players)) return;

      const newItems = setActiveToken([...items], clickToken);
      socket.emit(socketEvents.UPDATE_GAME_STATE, {
        gameState: gameStatus,
        players,
        items: newItems,
      });
    },
    [socket, gameStatus, players, items]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>, downCard: CardInterface) => {
      if (
        socket.id === getActivePlayerId(players) &&
        downCard.active
      ) {
        dispatch({ type: reducerCases.SET_IS_DRAGGING, isDragging: true });

        let clientX: number;
        let clientY: number;

        if ("touches" in e) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else {
          clientX = e.clientX;
          clientY = e.clientY;
        }

        setDragPosition({
          x: clientX,
          y: clientY,
        });
        if (isActiveCardInStack()) {
          const newItems = moveActiveCardToBoard([...items]);
          socket.emit(socketEvents.UPDATE_GAME_STATE, {
            gameState: gameStatus,
            players,
            items: newItems,
          });
        }
      }
    },
    [
      socket,
      gameStatus,
      players,
      items,
      dispatch,
      setDragPosition,
      isActiveCardInStack,
    ]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        requestAnimationFrame(() => {
          const halfWidth = activeCardWidth / 2;
          const halfHeight = activeCardWidth / 2;

          const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
          const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

          const clampedX = Math.max(halfWidth, Math.min(clientX, window.innerWidth - halfWidth - 3));
          const clampedY = Math.max(halfHeight, Math.min(clientY, window.innerHeight - halfHeight  - 3));
  
          setDragPosition({
            x: clampedX,
            y: clampedY,
          });
        });
      }
    },
    [activeCardWidth,isDragging, setDragPosition]
  );
  

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      dispatch({ type: reducerCases.SET_IS_DRAGGING, isDragging: false });
      setDragPosition({ x: 0, y: 0 });
      if (isActiveCardInBoard()) {
        const newItems = moveActiveCardToStack([...items]);
        socket.emit(socketEvents.UPDATE_GAME_STATE, {
          gameState: gameStatus,
          players,
          items: newItems,
        });
      }
    }
  }, [
    isDragging,
    socket,
    gameStatus,
    players,
    items,
    dispatch,
    setDragPosition,
    isActiveCardInBoard,
  ]);

  const handleMouseLeave = useCallback(() => {
    if (!socket.id) return;
    let newItems;
    if (isDragging) {
      newItems = moveActiveCardToBoard([...items]);
    } else {
      newItems = moveTokenToPlayer([...items], socket.id);
    }

    socket.emit(socketEvents.UPDATE_GAME_STATE, {
      gameState: gameStatus,
      players,
      items: newItems,
    });
  }, [
    isDragging,
    socket,
    gameStatus,
    players,
    items,
  ]);

  const handleMouseDraggingOver = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
      over: CardInterface | TokenInterface
    ) => {
      if (!isOverActiveCard(over)) {
        const now = Date.now();
        if (now - lastEmitTime.current > 50) {
          lastEmitTime.current = now;

          const newItems = items.filter((item) => isToken(item) || (isCard(item) && !item.active));
          const newIndex = getNewIndex(e, newItems, over);
  
          newItems.splice(newIndex, 0, {
            ...getActiveCard(items),
            playerId: getActivePlayerId(players),
          });
  
          handleTokenLogic(newItems);
  
          socket.emit(socketEvents.UPDATE_GAME_STATE, {
            gameState: gameStatus,
            players,
            items: newItems,
          });
        }
      }
    },
    [
      socket,
      gameStatus,
      players,
      items,
      isOverActiveCard,
      getNewIndex,
      handleTokenLogic,
    ]
  );

  const handleMouseOver = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
      over: CardInterface | TokenInterface
    ) => {
      if (!socket.id) return;
      if (socket.id !== getActivePlayerId(players)) {
        const result = getPlayerToken([...items], socket.id);
        if (!result) return;
        const [newItems, activeToken] = result;
        const newIndex = getNewIndex(e, newItems, over);

        newItems.splice(newIndex, 0, {
          ...activeToken,
          activePlayerId: getActivePlayerId(players),
        });

        handleTokenLogic(newItems);

        socket.emit(socketEvents.UPDATE_GAME_STATE, {
          gameState: gameStatus,
          players,
          items: newItems,
        });
      }
    },
    [
      socket,
      gameStatus,
      players,
      items,
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
