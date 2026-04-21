package interfaces.socket.game.moveCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.socket.game.moveCurrentCard.dto.MoveCurrentCardData;
import interfaces.socket.game.moveCurrentCard.dto.MoveCurrentCardRequest;

public class MoveCurrentCardMapper {
    public MoveCurrentCardData toDomain(MoveCurrentCardRequest request) {
        return new MoveCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                request.position()
        );
    }
}
