package interfaces.http.deckMovement.cardMovement.moveCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.deckMovement.cardMovement.moveCurrentCard.dto.MoveCurrentCardData;
import interfaces.http.deckMovement.cardMovement.moveCurrentCard.dto.MoveCurrentCardRequest;

public class MoveCurrentCardMapper {
    public MoveCurrentCardData toDomain(String gameId, String playerId, MoveCurrentCardRequest request) {
        return new MoveCurrentCardData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                request.position()
        );
    }
}

