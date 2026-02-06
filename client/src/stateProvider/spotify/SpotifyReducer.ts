import { SpotifyState } from "./SpotifyState.ts";
import { SpotifyAction } from "./SpotifyAction.ts";
import { spotifyReducerCases } from "./SpotifyReducerCases.ts";

export const spotifyReducer = (state: SpotifyState, action: SpotifyAction) => {
    switch (action.type) {
        case spotifyReducerCases.SET_SPOTIFY_PLAYER: {
            return {
                ...state,
                spotifyPlayer: action.spotifyPlayer,
            };
        }
        case spotifyReducerCases.SET_IS_PLAYING: {
            return {
                ...state,
                isPlaying: action.isPlaying,
            };
        }
        case spotifyReducerCases.SET_TIME_POSITION: {
            return {
                ...state,
                timePosition: action.timePosition,
            };
        }
        case spotifyReducerCases.SET_DURATION: {
            return {
                ...state,
                duration: action.duration,
            };
        }
        case spotifyReducerCases.SET_VOLUME: {
            return {
                ...state,
                volume: action.volume,
            };
        }
        default:
            return state;
    }
};