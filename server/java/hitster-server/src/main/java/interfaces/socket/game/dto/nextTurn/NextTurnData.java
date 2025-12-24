package interfaces.socket.game.dto.nextTurn;

import domain.game.GameId;
import domain.player.PlayerId;

public record NextTurnData(
        GameId gameId,
        PlayerId playerId
) {
}
