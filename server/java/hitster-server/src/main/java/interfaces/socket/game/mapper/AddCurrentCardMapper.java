package interfaces.socket.game.mapper;

import domain.game.GameId;
import domain.game.player.PlayerId;
import interfaces.socket.game.dto.addCurrentCard.AddCurrentCardData;
import interfaces.socket.game.dto.addCurrentCard.AddCurrentCardRequest;

public class AddCurrentCardMapper {
    public AddCurrentCardData toDomain(AddCurrentCardRequest request) {
        return new AddCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                request.position()
        );
    }
}
