import {SpotifyPlayer} from "../../type/spotify/SpotifyWebPlayback.ts";

export interface PlaybackState {
    spotifyPlayer: SpotifyPlayer | null;
    isPlaying: boolean;
    timePosition: number;
    duration: number;
    volume: number;
}