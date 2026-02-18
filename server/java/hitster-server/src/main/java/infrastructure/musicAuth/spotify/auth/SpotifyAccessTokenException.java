package infrastructure.musicAuth.spotify.auth;

import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessCode;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessTokenId;
import interfaces.exception.UnauthorizedException;

public class SpotifyAccessTokenException extends UnauthorizedException {
    public SpotifyAccessTokenException(SpotifyAccessCode spotifyAccessCode) {
        super("Failed to retrieve access token using access code: " + spotifyAccessCode);
    }

    public SpotifyAccessTokenException(SpotifyAccessTokenId refreshId) {
        super("Failed to retrieve access token using refresh ID: " + refreshId);
    }
}
