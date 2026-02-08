import {usePlaybackStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {useCallback} from "react";
import {playbackReducerCases} from "../../stateProvider/spotify/PlaybackReducerCases.ts";

export default function useSetPlayerTimePosition() {
    const [{ spotifyPlayer }, dispatchSpotifyState] = usePlaybackStateProvider();

    return useCallback(async (timePosition: number) => {
        if (!spotifyPlayer) return;

        dispatchSpotifyState({ type: playbackReducerCases.SET_TIME_POSITION, timePosition });
        await spotifyPlayer.seek(timePosition);
    }, [spotifyPlayer, dispatchSpotifyState]);
}