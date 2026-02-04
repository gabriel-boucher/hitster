package infrastructure.accessToken.exception;

import domain.spotify.accessToken.AccessCode;
import domain.spotify.accessToken.AccessTokenId;
import interfaces.exception.UnauthorizedException;

public class AccessTokenException extends UnauthorizedException {
    public AccessTokenException(AccessCode accessCode) {
        super("Failed to retrieve access token using access code: " + accessCode);
    }

    public AccessTokenException(AccessTokenId refreshId) {
        super("Failed to retrieve access token using refresh ID: " + refreshId);
    }
}
