import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {GameState} from "./GameState.ts";
import {GameAction} from "./GameAction.ts";
import {gameDefaultDispatch, gameInitialState} from "./GameInitialState.ts";
import {gameReducerCases} from "./GameReducerCases.ts";

const GameStateContext = createContext<[GameState, Dispatch<GameAction>]>([
  gameInitialState,
  gameDefaultDispatch,
]);

interface GameStateProviderProps {
  children: ReactNode;
  initialState: GameState;
  reducer: (state: GameState, action: GameAction) => GameState;
}

export const GameStateProvider = ({children, initialState, reducer}: GameStateProviderProps) => (
  <GameStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </GameStateContext.Provider>
);

export const useGameStateProvider = (): [GameState, Dispatch<GameAction>] =>
  useContext(GameStateContext);

export const useResetGameState = () => {
  const [, dispatch] = useGameStateProvider();
  return useCallback(() => {
    dispatch({ type: gameReducerCases.RESET });
  }, [dispatch]);
};
