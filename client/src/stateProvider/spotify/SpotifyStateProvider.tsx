import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer,
} from "react";
import {PlaybackState} from "./PlaybackState.ts";
import {PlaybackAction} from "./PlaybackAction.ts";
import {playbackDefaultDispatch, playbackInitialState} from "./PlaybackInitialState.ts";

const SpotifyStateContext = createContext<[PlaybackState, Dispatch<PlaybackAction>]>([
    playbackInitialState,
    playbackDefaultDispatch,
]);

interface SpotifyStateProviderProps {
    children: ReactNode;
    initialState: PlaybackState;
    reducer: (state: PlaybackState, action: PlaybackAction) => PlaybackState;
}

export const SpotifyStateProvider = ({children, initialState, reducer}: SpotifyStateProviderProps) => (
    <SpotifyStateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </SpotifyStateContext.Provider>
);

export const usePlaybackStateProvider = (): [PlaybackState, Dispatch<PlaybackAction>] =>
    useContext(SpotifyStateContext);

