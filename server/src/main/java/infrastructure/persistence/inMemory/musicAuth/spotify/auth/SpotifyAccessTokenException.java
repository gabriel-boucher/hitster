package infrastructure.persistence.inMemory.musicAuth.spotify.auth;

import infrastructure.persistence.inMemory.musicAuth.spotify.apiToken.SpotifyAccessCode;
import infrastructure.persistence.inMemory.musicAuth.spotify.apiToken.SpotifyAccessTokenId;
import interfaces.exception.UnauthorizedException;

public class SpotifyAccessTokenException extends UnauthorizedException {
    public SpotifyAccessTokenException(SpotifyAccessCode spotifyAccessCode) {
        super("Failed to retrieve access id using access code: " + spotifyAccessCode);
    }

    public SpotifyAccessTokenException(SpotifyAccessTokenId refreshId) {
        super("Failed to retrieve access id using refresh ID: " + refreshId);
    }
}
