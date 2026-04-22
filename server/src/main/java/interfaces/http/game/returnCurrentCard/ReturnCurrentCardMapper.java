package interfaces.http.game.returnCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.game.returnCurrentCard.dto.ReturnCurrentCardData;
import interfaces.http.game.returnCurrentCard.dto.ReturnCurrentCardRequest;

public class ReturnCurrentCardMapper {
    public ReturnCurrentCardData toDomain(ReturnCurrentCardRequest request) {
        return new ReturnCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}

