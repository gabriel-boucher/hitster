package interfaces.http.music.playlistProvider.spotifyAuth;

import domain.game.GameId;
import domain.player.PlayerId;
import infrastructure.persistence.inMemory.musicAuth.spotify.apiToken.SpotifyAccessCode;

public record AuthSpotifyData(
        GameId gameId,
        PlayerId playerId,
        SpotifyAccessCode spotifyAccessCode
) {
}
