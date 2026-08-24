package infrastructure.persistence.inMemory.musicAuth.spotify.apiToken;

public record SpotifyAccessToken(
        SpotifyAccessTokenId id,
        int expiresInSeconds,
        SpotifyAccessTokenId refreshId
) {
}
