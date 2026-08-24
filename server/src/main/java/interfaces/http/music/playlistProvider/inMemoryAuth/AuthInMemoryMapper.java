package interfaces.http.music.playlistProvider.inMemoryAuth;

import domain.game.GameId;
import domain.player.PlayerId;

public class AuthInMemoryMapper {
    public AuthInMemoryData toDomain(String gameId, String playerId) {
        return new AuthInMemoryData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId)
        );
    }
}
