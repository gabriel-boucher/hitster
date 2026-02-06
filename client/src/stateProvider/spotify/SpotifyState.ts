import {SpotifyPlayer} from "../../type/spotify/SpotifyWebPlayback.ts";

export interface SpotifyState {
    spotifyPlayer: SpotifyPlayer | null;
    isPlaying: boolean;
    timePosition: number;
    duration: number;
    volume: number;
}