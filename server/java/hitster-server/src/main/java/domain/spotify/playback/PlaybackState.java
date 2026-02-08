package domain.spotify.playback;

public record PlaybackState(
        boolean isPlaying,
        int volume,
        int timePosition,
        int duration
) {
}
