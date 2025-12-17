package interfaces.socket.game.mapper;

import domain.game.GameId;
import domain.game.player.PlayerId;
import interfaces.socket.game.dto.reorderCurrentCard.ReorderCurrentCardData;
import interfaces.socket.game.dto.reorderCurrentCard.ReorderCurrentCardRequest;

public class ReorderCurrentCardMapper {
    public ReorderCurrentCardData toDomain(ReorderCurrentCardRequest request) {
        return new ReorderCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                request.newPosition()
        );
    }
}
