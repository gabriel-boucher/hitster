package interfaces.http.game.addCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.game.addCurrentCard.dto.AddCurrentCardData;
import interfaces.http.game.addCurrentCard.dto.AddCurrentCardRequest;

public class AddCurrentCardMapper {
    public AddCurrentCardData toDomain(AddCurrentCardRequest request) {
        return new AddCurrentCardData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}

