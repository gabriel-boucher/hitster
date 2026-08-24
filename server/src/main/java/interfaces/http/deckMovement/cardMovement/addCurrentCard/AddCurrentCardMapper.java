package interfaces.http.deckMovement.cardMovement.addCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.deckMovement.cardMovement.addCurrentCard.dto.AddCurrentCardData;

public class AddCurrentCardMapper {
    public AddCurrentCardData toDomain(String gameId, String playerId) {
        return new AddCurrentCardData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId)
        );
    }
}

