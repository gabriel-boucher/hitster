import {Dispatch} from "react";
import {PlaybackAction} from "./PlaybackAction.ts";

export const playbackInitialState = {
    spotifyPlayer: null,
    isPlaying: false,
    timePosition: 0,
    duration: 0,
    volume: 0.5,
}

export const playbackDefaultDispatch: Dispatch<PlaybackAction> = () => {};