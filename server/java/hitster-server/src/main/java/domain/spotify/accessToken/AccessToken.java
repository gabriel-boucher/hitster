package domain.spotify.accessToken;

public record AccessToken(
        AccessTokenId id,
        int expiresInSeconds,
        AccessTokenId refreshId
) {
}
