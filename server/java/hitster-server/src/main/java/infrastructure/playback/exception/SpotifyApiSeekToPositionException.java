package infrastructure.playback.exception;

import domain.spotify.playback.DeviceId;

public class SpotifyApiSeekToPositionException extends RuntimeException {
    public SpotifyApiSeekToPositionException(DeviceId deviceId) {
        super("Failed to seek to position for device with ID: " + deviceId);
    }
}
