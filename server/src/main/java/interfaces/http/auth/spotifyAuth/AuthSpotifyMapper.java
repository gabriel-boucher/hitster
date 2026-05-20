package interfaces.http.auth.spotifyAuth;

import domain.game.GameId;
import domain.player.PlayerId;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessCode;

public class AuthSpotifyMapper {
    public AuthSpotifyData toDomain(AuthSpotifyRequest request) {
        return new AuthSpotifyData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                new SpotifyAccessCode(request.spotifyAccessCode())
        );
    }
}
