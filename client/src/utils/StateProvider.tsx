import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { Action, State } from "./interfaces";
import { defaultDispatch, initialState } from "./reducer";

const StateContext = createContext<[State, Dispatch<Action>]>([
  initialState,
  defaultDispatch,
]);

interface StateProviderProps {
  children: ReactNode;
  initialState: State;
  reducer: (state: State, action: Action) => State;
}

export const StateProvider = ({
  children,
  initialState,
  reducer,
}: StateProviderProps) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = (): [State, Dispatch<Action>] =>
  useContext(StateContext);
