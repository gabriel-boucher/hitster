package interfaces.socket.game.nextTurn;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.socket.game.nextTurn.dto.NextTurnData;
import interfaces.socket.game.nextTurn.dto.NextTurnRequest;

public class NextTurnMapper {
    public NextTurnData toDomain(NextTurnRequest request) {
        return new NextTurnData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
