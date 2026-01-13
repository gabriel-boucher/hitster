package interfaces.socket.game.addCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;

public class AddCurrentCardMapper {
    public AddCurrentCardData toDomain(AddCurrentCardRequest request) {
        return new AddCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                request.position()
        );
    }
}
