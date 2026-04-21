package infrastructure.musicAuth.spotify.auth;

import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessToken;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessTokenId;

public class SpotifyAccessTokenMapper {
    public SpotifyAccessToken toDomain(SpotifyAccessTokenDto dto) {
        return new SpotifyAccessToken(
                new SpotifyAccessTokenId(dto.id()),
                dto.expiresInSeconds(),
                new SpotifyAccessTokenId(dto.refreshId())
        );
    }
}
