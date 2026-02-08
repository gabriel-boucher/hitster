import {useEffect} from "react";
import {EventResponse} from "../../type/EventResponse.ts";
import {PlaybackSocketEvents} from "./playbackSocketEvents.ts";
import {usePlaybackStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {playbackReducerCases} from "../../stateProvider/spotify/PlaybackReducerCases.ts";
import {PlaybackState} from "../../stateProvider/spotify/PlaybackState.ts";
import {useConnectionStateProvider} from "../../stateProvider/connection/ConnectionStateProvider.tsx";


export default function usePlaybackState() {
    const [{ socket }] = useConnectionStateProvider();
    const [{ }, playbackDispatch] = usePlaybackStateProvider();

    useEffect(() => {
        if (!socket) return;

        const handlePlaybackState = (response: EventResponse<PlaybackState>) => {
            const playbackState = response.data;

            if (response.success && playbackState) {
                playbackDispatch({ type: playbackReducerCases.SET_IS_PLAYING, isPlaying: playbackState.isPlaying });
                playbackDispatch({ type: playbackReducerCases.SET_VOLUME, volume: playbackState.volume });
                playbackDispatch({ type: playbackReducerCases.SET_TIME_POSITION, timePosition: playbackState.timePosition });
                playbackDispatch({ type: playbackReducerCases.SET_DURATION, duration: playbackState.duration });
            }
        };

        socket.on(PlaybackSocketEvents.PLAYBACK_STATE, handlePlaybackState);

        return () => {
            socket.off(PlaybackSocketEvents.PLAYBACK_STATE, handlePlaybackState);
        }
    }, [socket, playbackDispatch]);
}