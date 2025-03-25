import { useCallback } from "react";
import { useStateProvider } from "./StateProvider";
import { reducerCases } from "./Constants";


export function useMouseHandlers(
  isDragging: boolean,
  dragOffset: { x: number; y: number },
  setDragPosition: (position: { x: number; y: number }) => void,
  setDragOffset: (position: { x: number; y: number }) => void,
  setIsDragging: (value: boolean) => void,
) {
  const [{ players, activePlayer, cards, activeCard, gapIndex }, dispatch] = useStateProvider();

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        requestAnimationFrame(() => {
            setDragPosition({
              x: e.clientX - dragOffset.x,
              y: e.clientY - dragOffset.y,
            });
        });
      }
    },
    [isDragging, dragOffset, setDragPosition]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      if (gapIndex !== null) {
        // Card dropped in the deck
        const newPlayers = { ...players };
        newPlayers[activePlayer].cards.splice(gapIndex, 0, activeCard);
        dispatch({ type: reducerCases.SET_PLAYERS, players: newPlayers });
      } else {
        // Card returns to the stack
        dispatch({ type: reducerCases.SET_CARDS, cards: [...cards, activeCard] });
      }
      dispatch({ type: reducerCases.SET_GAP_INDEX, gapIndex: null });
      setIsDragging(false);
      setDragPosition({ x: 0, y: 0 });
    }
  }, [isDragging, gapIndex]);

  const handleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      card: reducerCases.SET_PLAYERS | reducerCases.SET_CARDS
    ) => {

      if (e.currentTarget.id === activeCard.id) {
        const rect = e.currentTarget.getBoundingClientRect();
        setDragOffset({
          x: rect.width / 2,
          y: rect.height / 2,
        });
        setDragPosition({
          x: e.clientX - rect.width / 2,
          y: e.clientY - rect.height / 2,
        });
        
        if (card === reducerCases.SET_PLAYERS) {
          const newPlayers = { ...players };
          newPlayers[activePlayer].cards = newPlayers[activePlayer].cards.filter((card) => card.id !== activeCard.id);
          dispatch({ type: reducerCases.SET_PLAYERS, players: newPlayers });
        } else if (card === reducerCases.SET_CARDS) {
          dispatch({ type: reducerCases.SET_CARDS, cards: cards.filter((card) => card.id !== activeCard.id) });
        }

        setIsDragging(true);
      }
    },
    [activeCard]
  );

  const handleDeckGapDetection = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, cardIndex: number) => {
      if (isDragging) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        dispatch({ type: reducerCases.SET_GAP_INDEX, gapIndex: mouseX < rect.width / 2 ? cardIndex : cardIndex + 1 });
      }
    },
    [isDragging]
  );

  return { handleMouseMove, handleMouseUp, handleMouseDown, handleDeckGapDetection };
}
