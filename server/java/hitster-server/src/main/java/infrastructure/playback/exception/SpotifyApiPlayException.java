package infrastructure.playback.exception;

import domain.spotify.playback.DeviceId;

public class SpotifyApiPlayException extends RuntimeException {
    public SpotifyApiPlayException(DeviceId deviceId) {
        super("Failed to play on Spotify API with device id: " + deviceId.toString());
    }
}
