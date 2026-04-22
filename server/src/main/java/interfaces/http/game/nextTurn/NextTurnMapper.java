package interfaces.http.game.nextTurn;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.game.nextTurn.dto.NextTurnData;
import interfaces.http.game.nextTurn.dto.NextTurnRequest;

public class NextTurnMapper {
    public NextTurnData toDomain(NextTurnRequest request) {
        return new NextTurnData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}

