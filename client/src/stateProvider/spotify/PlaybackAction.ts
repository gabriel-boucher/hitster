import {playbackReducerCases} from "./PlaybackReducerCases.ts";
import {SpotifyPlayer} from "../../type/spotify/SpotifyWebPlayback.ts";

export interface SetSpotifyPlayerAction {
    type: playbackReducerCases.SET_SPOTIFY_PLAYER;
    spotifyPlayer: SpotifyPlayer;
}

export interface SetIsPlayingAction {
    type: playbackReducerCases.SET_IS_PLAYING;
    isPlaying: boolean;
}

export interface SetTimePositionAction {
    type: playbackReducerCases.SET_TIME_POSITION;
    timePosition: number;
}

export interface SetDurationAction {
    type: playbackReducerCases.SET_DURATION;
    duration: number;
}

export interface SetVolumeAction {
    type: playbackReducerCases.SET_VOLUME;
    volume: number;
}

export type PlaybackAction =
    | SetSpotifyPlayerAction
    | SetIsPlayingAction
    | SetTimePositionAction
    | SetDurationAction
    | SetVolumeAction;