package interfaces.rest.auth.spotifyAuth;

import domain.player.PlayerId;
import domain.room.RoomId;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessCode;

public class AuthSpotifyMapper {
    public AuthSpotifyData toDomain(AuthSpotifyRequest request) {
        return new AuthSpotifyData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                new SpotifyAccessCode(request.spotifyAccessCode())
        );
    }
}
