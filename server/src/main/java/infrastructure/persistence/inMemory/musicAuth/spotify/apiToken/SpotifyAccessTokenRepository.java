package infrastructure.persistence.inMemory.musicAuth.spotify.apiToken;

import domain.game.GameId;

public interface SpotifyAccessTokenRepository {
    SpotifyAccessToken getSpotifyApiTokenByGameId(GameId gameId);
    void saveSpotifyApiToken(GameId gameId, SpotifyAccessToken spotifyAccessToken);
}
