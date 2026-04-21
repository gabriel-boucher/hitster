package infrastructure.musicAuth.spotify.apiToken;

public record SpotifyAccessToken(
        SpotifyAccessTokenId id,
        int expiresInSeconds,
        SpotifyAccessTokenId refreshId
) {
}
