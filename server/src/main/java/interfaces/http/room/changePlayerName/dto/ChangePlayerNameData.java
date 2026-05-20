package interfaces.http.room.changePlayerName.dto;

import domain.game.GameId;
import domain.player.PlayerId;

public record ChangePlayerNameData(
        GameId gameId,
        PlayerId playerId,
        String newName
) {
}
