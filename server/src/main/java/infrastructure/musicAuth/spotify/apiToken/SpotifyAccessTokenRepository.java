package infrastructure.musicAuth.spotify.apiToken;

import domain.room.RoomId;

public interface SpotifyAccessTokenRepository {
    SpotifyAccessToken getSpotifyApiTokenByRoomId(RoomId roomId);
    void saveSpotifyApiToken(RoomId roomId, SpotifyAccessToken spotifyAccessToken);
}
