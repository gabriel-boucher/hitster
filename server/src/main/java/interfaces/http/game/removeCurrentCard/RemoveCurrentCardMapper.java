package interfaces.http.game.removeCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.game.removeCurrentCard.dto.RemoveCurrentCardData;
import interfaces.http.game.removeCurrentCard.dto.RemoveCurrentCardRequest;

public class RemoveCurrentCardMapper {
    public RemoveCurrentCardData toDomain(RemoveCurrentCardRequest request) {
        return new RemoveCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}

