package infrastructure.playback.exception;

import domain.spotify.playback.DeviceId;

public class SpotifyApiSetVolumeException extends RuntimeException {
    public SpotifyApiSetVolumeException(DeviceId deviceId) {
        super("Failed to set volume for device with ID: " + deviceId);
    }
}
