package interfaces.rest.spotify.playback.seekToPosition;

public record SeekToPositionRequest(
        String deviceId,
        int positionMs
) {
}

