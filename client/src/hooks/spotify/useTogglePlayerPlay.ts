import {useCallback} from "react";
import {useSpotifyStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {spotifyReducerCases} from "../../stateProvider/spotify/SpotifyReducerCases.ts";

export default function useTogglePlayerPlay() {
    const [{ spotifyPlayer, isPlaying }, dispatchSpotifyState] = useSpotifyStateProvider();

    return useCallback(async () => {
        if (!spotifyPlayer) return;

        dispatchSpotifyState({ type: spotifyReducerCases.SET_IS_PLAYING, isPlaying: !isPlaying });
        await spotifyPlayer.togglePlay();
    }, [spotifyPlayer, isPlaying, dispatchSpotifyState]);
}