import {Dispatch} from "react";
import {SpotifyAction} from "./SpotifyAction.ts";

export const spotifyInitialState = {
    spotifyPlayer: null,
    isPlaying: false,
    timePosition: 0,
    duration: 0,
    volume: 0.5,
}

export const spotifyDefaultDispatch: Dispatch<SpotifyAction> = () => {};