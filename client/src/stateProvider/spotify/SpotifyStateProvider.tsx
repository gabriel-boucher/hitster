import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from "react";
import {SpotifyState} from "./SpotifyState.ts";
import {SpotifyAction} from "./SpotifyAction.ts";
import {spotifyDefaultDispatch, spotifyInitialState} from "./SpotifyInitialState.ts";

const SpotifyStateContext = createContext<[SpotifyState, Dispatch<SpotifyAction>]>([
    spotifyInitialState,
    spotifyDefaultDispatch,
]);

interface SpotifyStateProviderProps {
    children: ReactNode;
    initialState: SpotifyState;
    reducer: (state: SpotifyState, action: SpotifyAction) => SpotifyState;
}

export const SpotifyStateProvider = ({children, initialState, reducer}: SpotifyStateProviderProps) => (
    <SpotifyStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </SpotifyStateContext.Provider>
);

export const useSpotifyStateProvider = (): [SpotifyState, Dispatch<SpotifyAction>] =>
    useContext(SpotifyStateContext);

