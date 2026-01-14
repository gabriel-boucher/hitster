package interfaces.socket.game.nextTurn.dto;

import domain.game.GameId;
import domain.player.PlayerId;

public record NextTurnData(
        GameId gameId,
        PlayerId playerId
) {
}
