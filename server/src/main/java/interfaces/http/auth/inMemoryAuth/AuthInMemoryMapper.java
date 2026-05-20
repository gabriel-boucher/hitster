package interfaces.http.auth.inMemoryAuth;

import domain.game.GameId;
import domain.player.PlayerId;

public class AuthInMemoryMapper {
    public AuthInMemoryData toDomain(AuthInMemoryRequest request) {
        return new AuthInMemoryData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
