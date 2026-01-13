package interfaces.socket.game.nextTurn;

import domain.game.GameId;
import domain.player.PlayerId;

public class NextTurnMapper {
    public NextTurnData toDomain(NextTurnRequest request) {
        return new NextTurnData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
