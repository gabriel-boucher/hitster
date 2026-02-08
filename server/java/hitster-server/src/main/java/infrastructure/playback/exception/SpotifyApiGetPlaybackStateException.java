package infrastructure.playback.exception;

import domain.spotify.playback.DeviceId;

public class SpotifyApiGetPlaybackStateException extends RuntimeException {
    public SpotifyApiGetPlaybackStateException(DeviceId deviceId) {
        super("Failed to get playback state for device with id: " + deviceId);
    }
}
