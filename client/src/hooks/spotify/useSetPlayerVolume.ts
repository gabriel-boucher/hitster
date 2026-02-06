import {useSpotifyStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {useCallback} from "react";
import {spotifyReducerCases} from "../../stateProvider/spotify/SpotifyReducerCases.ts";

export default function useSetPlayerVolume() {
    const [{ spotifyPlayer }, dispatchSpotifyState] = useSpotifyStateProvider();

    return useCallback(async (volume: number) => {
        if (!spotifyPlayer) return;

        dispatchSpotifyState({ type: spotifyReducerCases.SET_VOLUME, volume });
        await spotifyPlayer.setVolume(volume);
    }, [spotifyPlayer, dispatchSpotifyState]);
}