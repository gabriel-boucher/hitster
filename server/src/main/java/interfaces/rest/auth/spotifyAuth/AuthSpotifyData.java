package interfaces.rest.auth.spotifyAuth;

import domain.player.PlayerId;
import domain.room.RoomId;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessCode;

public record AuthSpotifyData(
        RoomId roomId,
        PlayerId playerId,
        SpotifyAccessCode spotifyAccessCode
) {
}
