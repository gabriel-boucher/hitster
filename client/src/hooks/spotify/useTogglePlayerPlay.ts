import {useCallback} from "react";
import {usePlaybackStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {playbackReducerCases} from "../../stateProvider/spotify/PlaybackReducerCases.ts";

export default function useTogglePlayerPlay() {
    const [{ spotifyPlayer, isPlaying }, dispatchSpotifyState] = usePlaybackStateProvider();

    return useCallback(async () => {
        if (!spotifyPlayer) return;

        dispatchSpotifyState({ type: playbackReducerCases.SET_IS_PLAYING, isPlaying: !isPlaying });
        await spotifyPlayer.togglePlay();
    }, [spotifyPlayer, isPlaying, dispatchSpotifyState]);
}