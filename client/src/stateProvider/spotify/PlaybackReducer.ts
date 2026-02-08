import { PlaybackState } from "./PlaybackState.ts";
import { PlaybackAction } from "./PlaybackAction.ts";
import { playbackReducerCases } from "./PlaybackReducerCases.ts";

export const playbackReducer = (state: PlaybackState, action: PlaybackAction) => {
    switch (action.type) {
        case playbackReducerCases.SET_SPOTIFY_PLAYER: {
            return {
                ...state,
                spotifyPlayer: action.spotifyPlayer,
            };
        }
        case playbackReducerCases.SET_IS_PLAYING: {
            return {
                ...state,
                isPlaying: action.isPlaying,
            };
        }
        case playbackReducerCases.SET_TIME_POSITION: {
            return {
                ...state,
                timePosition: action.timePosition,
            };
        }
        case playbackReducerCases.SET_DURATION: {
            return {
                ...state,
                duration: action.duration,
            };
        }
        case playbackReducerCases.SET_VOLUME: {
            return {
                ...state,
                volume: action.volume,
            };
        }
        default:
            return state;
    }
};