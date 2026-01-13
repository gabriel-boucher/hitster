package interfaces.socket.game.reorderCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;

public class ReorderCurrentCardMapper {
    public ReorderCurrentCardData toDomain(ReorderCurrentCardRequest request) {
        return new ReorderCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                request.newPosition()
        );
    }
}
