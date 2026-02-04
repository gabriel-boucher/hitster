import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import {ConnectionState} from "./ConnectionState.ts";
import {ConnectionAction} from "./ConnectionAction.ts";
import {connectionDefaultDispatch, connectionInitialState} from "./ConnectionInitialState.ts";

const ConnectionStateContext = createContext<[ConnectionState, Dispatch<ConnectionAction>]>([
  connectionInitialState,
  connectionDefaultDispatch,
]);

interface ConnectionStateProviderProps {
  children: ReactNode;
  initialState: ConnectionState;
  reducer: (state: ConnectionState, action: ConnectionAction) => ConnectionState;
}

export const ConnectionStateProvider = ({children, initialState, reducer}: ConnectionStateProviderProps) => (
  <ConnectionStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </ConnectionStateContext.Provider>
);

export const useConnectionStateProvider = (): [ConnectionState, Dispatch<ConnectionAction>] =>
  useContext(ConnectionStateContext);

