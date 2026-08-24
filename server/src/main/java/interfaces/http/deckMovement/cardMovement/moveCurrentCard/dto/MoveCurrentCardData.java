package interfaces.http.deckMovement.cardMovement.moveCurrentCard.dto;

import domain.game.GameId;
import domain.player.PlayerId;

public record MoveCurrentCardData(
        GameId gameId,
        PlayerId playerId,
        int position
) {
}

