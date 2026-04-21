package interfaces.socket.game.returnCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.socket.game.returnCurrentCard.dto.ReturnCurrentCardData;
import interfaces.socket.game.returnCurrentCard.dto.ReturnCurrentCardRequest;

public class ReturnCurrentCardMapper {
    public ReturnCurrentCardData toDomain(ReturnCurrentCardRequest request) {
        return new ReturnCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
