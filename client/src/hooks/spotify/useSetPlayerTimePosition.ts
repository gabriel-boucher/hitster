import {useSpotifyStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {useCallback} from "react";
import {spotifyReducerCases} from "../../stateProvider/spotify/SpotifyReducerCases.ts";

export default function useSetPlayerTimePosition() {
    const [{ spotifyPlayer }, dispatchSpotifyState] = useSpotifyStateProvider();

    return useCallback(async (timePosition: number) => {
        if (!spotifyPlayer) return;

        dispatchSpotifyState({ type: spotifyReducerCases.SET_TIME_POSITION, timePosition });
        await spotifyPlayer.seek(timePosition);
    }, [spotifyPlayer, dispatchSpotifyState]);
}