package interfaces.socket.game.dto.removeCurrentCard;

import domain.game.GameId;
import domain.game.player.PlayerId;

public record RemoveCurrentCardData(
        GameId gameId,
        PlayerId playerId
) {
}
