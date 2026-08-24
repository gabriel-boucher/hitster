package interfaces.http.deckMovement.cardMovement.removeCurrentCard.dto;

import domain.game.GameId;
import domain.player.PlayerId;

public record RemoveCurrentCardData(
        GameId gameId,
        PlayerId playerId
) {
}

