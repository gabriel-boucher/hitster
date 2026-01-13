package interfaces.socket.game.addCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;

public record AddCurrentCardData(
        GameId gameId,
        PlayerId playerId,
        int position
) {
}
