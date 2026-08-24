package interfaces.http.deckMovement.cardMovement.returnCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.deckMovement.cardMovement.returnCurrentCard.dto.ReturnCurrentCardData;

public class ReturnCurrentCardMapper {
    public ReturnCurrentCardData toDomain(String gameId, String playerId) {
        return new ReturnCurrentCardData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId)
        );
    }
}

