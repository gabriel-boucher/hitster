package infrastructure.persistence.inMemory.musicAuth.spotify.apiToken;

import domain.game.GameId;

import java.util.HashMap;

public class InMemorySpotifyAccessTokenRepository implements SpotifyAccessTokenRepository {
    private final HashMap<GameId, SpotifyAccessToken> spotifyApiTokens ;

    public InMemorySpotifyAccessTokenRepository() {
        spotifyApiTokens = new HashMap<>();
    }

    @Override
    public SpotifyAccessToken getSpotifyApiTokenByGameId(GameId gameId) {
        return spotifyApiTokens.get(gameId);
    }

    @Override
    public void saveSpotifyApiToken(GameId gameId, SpotifyAccessToken spotifyAccessToken) {
        spotifyApiTokens.put(gameId, spotifyAccessToken);
    }
}
