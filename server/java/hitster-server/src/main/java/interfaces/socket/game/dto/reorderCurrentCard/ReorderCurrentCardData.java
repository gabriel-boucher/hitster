package interfaces.socket.game.dto.reorderCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;

public record ReorderCurrentCardData(
        GameId gameId,
        PlayerId playerId,
        int newPosition
) {
}
