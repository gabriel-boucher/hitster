package interfaces.socket.spotify;

public record PlaybackStateResponse(
        boolean isPlaying,
        int volume,
        int timePosition,
        int duration
) {
}

