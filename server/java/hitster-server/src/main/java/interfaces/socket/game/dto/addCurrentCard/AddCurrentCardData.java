package interfaces.socket.game.dto.addCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;

public record AddCurrentCardData(
        GameId gameId,
        PlayerId playerId,
        int position
) {
}
