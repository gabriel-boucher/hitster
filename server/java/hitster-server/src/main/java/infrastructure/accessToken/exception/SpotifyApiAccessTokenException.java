package infrastructure.accessToken.exception;

import domain.spotify.accessToken.AccessCode;
import domain.spotify.accessToken.AccessTokenId;

public class SpotifyApiAccessTokenException extends RuntimeException {
    public SpotifyApiAccessTokenException(AccessCode accessCode) {
        super("Failed to retrieve access token using access code: " + accessCode);
    }

    public SpotifyApiAccessTokenException(AccessTokenId refreshId) {
        super("Failed to retrieve access token using refresh ID: " + refreshId);
    }
}
