package interfaces.http.music.playlistProvider.inMemoryAuth;

import domain.game.GameId;
import domain.player.PlayerId;

public record AuthInMemoryData(
        GameId gameId,
        PlayerId playerId
) {
}
