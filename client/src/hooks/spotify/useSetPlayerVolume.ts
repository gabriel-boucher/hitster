import {usePlaybackStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {useCallback} from "react";
import {playbackReducerCases} from "../../stateProvider/spotify/PlaybackReducerCases.ts";

export default function useSetPlayerVolume() {
    const [{ spotifyPlayer }, dispatchSpotifyState] = usePlaybackStateProvider();

    return useCallback(async (volume: number) => {
        if (!spotifyPlayer) return;

        dispatchSpotifyState({ type: playbackReducerCases.SET_VOLUME, volume });
        await spotifyPlayer.setVolume(volume);
    }, [spotifyPlayer, dispatchSpotifyState]);
}