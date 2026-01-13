package interfaces.socket.game.removeCurrentCard;

import domain.game.GameId;
import domain.player.PlayerId;

public record RemoveCurrentCardData(
        GameId gameId,
        PlayerId playerId
) {
}
