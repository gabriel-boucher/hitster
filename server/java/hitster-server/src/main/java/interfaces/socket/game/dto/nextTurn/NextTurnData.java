package interfaces.socket.game.dto.nextTurn;

import domain.game.GameId;
import domain.game.player.PlayerId;

public record NextTurnData(
        GameId gameId,
        PlayerId playerId
) {
}
