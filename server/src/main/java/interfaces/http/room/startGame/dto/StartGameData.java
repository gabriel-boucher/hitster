package interfaces.http.room.startGame.dto;

import domain.game.GameId;
import domain.player.PlayerId;

public record StartGameData(
        GameId gameId,
        PlayerId playerId
) {
}
