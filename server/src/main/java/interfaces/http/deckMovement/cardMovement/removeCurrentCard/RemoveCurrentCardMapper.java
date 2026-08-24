package interfaces.http.deckMovement.cardMovement.removeCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.deckMovement.cardMovement.removeCurrentCard.dto.RemoveCurrentCardData;

public class RemoveCurrentCardMapper {
    public RemoveCurrentCardData toDomain(String gameId, String playerId) {
        return new RemoveCurrentCardData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId)
        );
    }
}

