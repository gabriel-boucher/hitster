import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import {RoomState} from "./RoomState.ts";
import {RoomAction} from "./RoomAction.ts";
import {roomDefaultDispatch, roomInitialState} from "./RoomInitialState.ts";

const RoomStateContext = createContext<[RoomState, Dispatch<RoomAction>]>([
  roomInitialState,
  roomDefaultDispatch,
]);

interface RoomStateProviderProps {
  children: ReactNode;
  initialState: RoomState;
  reducer: (state: RoomState, action: RoomAction) => RoomState;
}

export const RoomStateProvider = ({children, initialState, reducer}: RoomStateProviderProps) => (
  <RoomStateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </RoomStateContext.Provider>
);

export const useRoomStateProvider = (): [RoomState, Dispatch<RoomAction>] =>
  useContext(RoomStateContext);

