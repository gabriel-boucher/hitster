package infrastructure.musicAuth.spotify.apiToken;

import domain.game.GameId;

public interface SpotifyAccessTokenRepository {
    SpotifyAccessToken getSpotifyApiTokenByGameId(GameId gameId);
    void saveSpotifyApiToken(GameId gameId, SpotifyAccessToken spotifyAccessToken);
}
