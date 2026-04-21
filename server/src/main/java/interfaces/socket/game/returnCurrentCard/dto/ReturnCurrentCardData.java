package interfaces.socket.game.returnCurrentCard.dto;

import domain.game.GameId;
import domain.player.PlayerId;

public record ReturnCurrentCardData(
        GameId gameId,
        PlayerId playerId
) {
}
