package infrastructure.playback.exception;

import domain.spotify.playback.DeviceId;

public class SpotifyApiPauseException extends RuntimeException {
    public SpotifyApiPauseException(DeviceId deviceId) {
        super("Failed to pause on Spotify API with device id: " + deviceId.toString());
    }
}
