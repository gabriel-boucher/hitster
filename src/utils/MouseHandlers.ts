import { useCallback } from "react";
import { useStateProvider } from "./StateProvider";
import { reducerCases } from "./Constants";
import { CardInterface } from "./Interfaces";
import { useMouseHandlersHelpers } from "./MouseHandlersHelpers";

export function useMouseHandlers(
  isDragging: boolean,
  setDragPosition: (position: { x: number; y: number }) => void,
  setIsDragging: (value: boolean) => void
) {
  const [{ activePlayer, cards, activeCard }, dispatch] = useStateProvider();

  const { moveActiveCardTo, isActiveCardInBoard, isActiveCardInStack, isActiveCardInPlayer } = useMouseHandlersHelpers();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, downCard: CardInterface) => {
      if (downCard.id === activeCard.id) {
        if (isActiveCardInStack()) {
          const newCards = moveActiveCardTo("board");
          dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
        }
        setIsDragging(true);
        setDragPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    },
    [activeCard]
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
        const newCards = moveActiveCardTo(null);
        dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
      }
      setIsDragging(false);
      setDragPosition({ x: 0, y: 0 });
    }
  }, [isDragging, cards, activeCard]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      const newCards = moveActiveCardTo("board");
      dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    }
  }, [isDragging, cards, activeCard]);

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, overCard: CardInterface) => {
      if (isDragging && overCard.id !== activeCard.id) {
        const newCards = cards.filter((card) => card.id !== activeCard.id);
        const newIndex = getNewIndex(e, newCards, overCard);

        newCards.splice(newIndex, 0, {
          ...activeCard,
          playerId: activePlayer.socketId,
        });

        dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
      }
    },
    [isDragging, activePlayer, cards, activeCard, dispatch]
  );

  function getNewIndex(
    e: React.MouseEvent<HTMLDivElement>,
    newCards: CardInterface[],
    overCard: CardInterface
  ) {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    if (isActiveCardInBoard()) {
      const overCardIndex = newCards.findIndex(
        (card) => card.id === overCard.id
      );
      return mouseX < rect.width / 2 ? overCardIndex : overCardIndex + 1;
    } else {
      const overCardIndex = cards.findIndex((card) => card.id === overCard.id);
      return overCardIndex;
    }
  }

  return {
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
    handleMouseLeave,
    handleMouseOver,
  };
}
