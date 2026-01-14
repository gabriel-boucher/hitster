package interfaces.socket.game.reorderCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.socket.game.reorderCurrentCard.dto.ReorderCurrentCardData;
import interfaces.socket.game.reorderCurrentCard.dto.ReorderCurrentCardRequest;

public class ReorderCurrentCardMapper {
    public ReorderCurrentCardData toDomain(ReorderCurrentCardRequest request) {
        return new ReorderCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                request.newPosition()
        );
    }
}
