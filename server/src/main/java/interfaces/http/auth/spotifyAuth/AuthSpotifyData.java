package interfaces.http.auth.spotifyAuth;

import domain.game.GameId;
import domain.player.PlayerId;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessCode;

public record AuthSpotifyData(
        GameId gameId,
        PlayerId playerId,
        SpotifyAccessCode spotifyAccessCode
) {
}
