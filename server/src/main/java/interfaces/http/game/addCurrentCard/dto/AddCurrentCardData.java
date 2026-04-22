package interfaces.http.game.addCurrentCard.dto;

import domain.game.GameId;
import domain.player.PlayerId;

public record AddCurrentCardData(
        GameId gameId,
        PlayerId playerId
) {
}

