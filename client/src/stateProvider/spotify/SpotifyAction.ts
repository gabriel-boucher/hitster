import {spotifyReducerCases} from "./SpotifyReducerCases.ts";
import {SpotifyPlayer} from "../../type/spotify/SpotifyWebPlayback.ts";

export interface SetSpotifyPlayerAction {
    type: spotifyReducerCases.SET_SPOTIFY_PLAYER;
    spotifyPlayer: SpotifyPlayer;
}

export interface SetIsPlayingAction {
    type: spotifyReducerCases.SET_IS_PLAYING;
    isPlaying: boolean;
}

export interface SetTimePositionAction {
    type: spotifyReducerCases.SET_TIME_POSITION;
    timePosition: number;
}

export interface SetDurationAction {
    type: spotifyReducerCases.SET_DURATION;
    duration: number;
}

export interface SetVolumeAction {
    type: spotifyReducerCases.SET_VOLUME;
    volume: number;
}

export type SpotifyAction =
    | SetSpotifyPlayerAction
    | SetIsPlayingAction
    | SetTimePositionAction
    | SetDurationAction
    | SetVolumeAction;