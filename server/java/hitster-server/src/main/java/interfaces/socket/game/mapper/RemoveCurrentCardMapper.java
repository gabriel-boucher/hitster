package interfaces.socket.game.mapper;

import domain.game.GameId;
import domain.game.player.PlayerId;
import interfaces.socket.game.dto.removeCurrentCard.RemoveCurrentCardData;
import interfaces.socket.game.dto.removeCurrentCard.RemoveCurrentCardRequest;

public class RemoveCurrentCardMapper {
    public RemoveCurrentCardData toDomain(RemoveCurrentCardRequest request) {
        return new RemoveCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
