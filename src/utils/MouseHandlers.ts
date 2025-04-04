import { useCallback } from "react";
import { useStateProvider } from "./StateProvider";
import { reducerCases } from "./Constants";
import { CardInterface } from "./Interfaces";

export function useMouseHandlers(
  isDragging: boolean,
  setDragPosition: (position: { x: number; y: number }) => void,
  setIsDragging: (value: boolean) => void
) {
  const [{ activePlayer, cards, activeCard }, dispatch] = useStateProvider();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, downCard: CardInterface) => {
      if (downCard.id === activeCard.id) {
        setDragPosition({
          x: e.clientX,
          y: e.clientY,
        });
        setIsDragging(true);

        if (activeCard.playerId === null) {
          const newCards = cards.map((card) =>
            card.id === activeCard.id ? { ...card, playerId: "board" } : card
          );

          dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
        }
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
      if (activeCard.playerId === "board") {
        const newCards = cards.filter((card) => card.id !== activeCard.id);
        newCards.push({ ...activeCard, playerId: null });

        dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
      }
      setIsDragging(false);
      setDragPosition({ x: 0, y: 0 });
    }
  }, [isDragging, cards, activeCard]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging) {
      const newCards = cards.filter((card) => card.id !== activeCard.id);
      newCards.push({ ...activeCard, playerId: "board" });

      dispatch({ type: reducerCases.SET_CARDS, cards: newCards });
    }
  }, [isDragging, cards, activeCard]);

  const handleMouseOver = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, overCard: CardInterface) => {
      if (isDragging && overCard.id !== activeCard.id) {
        const newIndex = getNewIndex(e, overCard);

        const newCards = cards.filter((card) => card.id !== activeCard.id);
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
    overCard: CardInterface
  ) {
    const overCardIndex = cards.findIndex((card) => card.id === overCard.id);

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    if (activeCard.playerId === "board") {
      return mouseX < rect.width / 2 ? overCardIndex : overCardIndex + 1;
    }

    return overCardIndex;
  }

  return {
    handleMouseMove,
    handleMouseUp,
    handleMouseDown,
    handleMouseLeave,
    handleMouseOver,
  };
}
