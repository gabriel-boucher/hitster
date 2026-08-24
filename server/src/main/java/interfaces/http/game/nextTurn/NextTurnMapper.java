package interfaces.http.game.nextTurn;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.game.nextTurn.dto.NextTurnData;

public class NextTurnMapper {
    public NextTurnData toDomain(String gameId, String playerId) {
        return new NextTurnData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId)
        );
    }
}

