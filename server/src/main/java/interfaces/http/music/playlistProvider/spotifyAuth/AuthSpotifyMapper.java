package interfaces.http.music.playlistProvider.spotifyAuth;

import domain.game.GameId;
import domain.player.PlayerId;
import infrastructure.persistence.inMemory.musicAuth.spotify.apiToken.SpotifyAccessCode;

public class AuthSpotifyMapper {
    public AuthSpotifyData toDomain(String gameId, String playerId, AuthSpotifyRequest request) {
        return new AuthSpotifyData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                new SpotifyAccessCode(request.spotifyAccessCode())
        );
    }
}
