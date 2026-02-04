package infrastructure.accessToken.mapper;

import domain.spotify.accessToken.AccessToken;
import domain.spotify.accessToken.AccessTokenId;
import infrastructure.accessToken.dto.AccessTokenSpotifyDto;

public class AccessTokenSpotifyMapper {
    public AccessToken toDomain(AccessTokenSpotifyDto dto) {
        return new AccessToken(
                new AccessTokenId(dto.id()),
                dto.expiresInSeconds(),
                new AccessTokenId(dto.refreshId())
        );
    }
}
