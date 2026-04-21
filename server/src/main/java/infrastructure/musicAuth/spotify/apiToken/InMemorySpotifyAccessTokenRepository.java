package infrastructure.musicAuth.spotify.apiToken;

import domain.room.RoomId;

import java.util.HashMap;

public class InMemorySpotifyAccessTokenRepository implements SpotifyAccessTokenRepository {
    private final HashMap<RoomId, SpotifyAccessToken> spotifyApiTokens ;

    public InMemorySpotifyAccessTokenRepository() {
        spotifyApiTokens = new HashMap<>();
    }

    @Override
    public SpotifyAccessToken getSpotifyApiTokenByRoomId(RoomId roomId) {
        return spotifyApiTokens.get(roomId);
    }

    @Override
    public void saveSpotifyApiToken(RoomId roomId, SpotifyAccessToken spotifyAccessToken) {
        spotifyApiTokens.put(roomId, spotifyAccessToken);
    }
}
