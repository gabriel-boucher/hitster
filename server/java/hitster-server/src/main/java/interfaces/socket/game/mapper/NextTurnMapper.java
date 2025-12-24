package interfaces.socket.game.mapper;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.socket.game.dto.nextTurn.NextTurnData;
import interfaces.socket.game.dto.nextTurn.NextTurnRequest;

public class NextTurnMapper {
    public NextTurnData toDomain(NextTurnRequest request) {
        return new NextTurnData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
