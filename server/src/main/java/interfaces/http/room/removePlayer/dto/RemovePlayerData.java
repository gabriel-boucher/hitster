package interfaces.http.room.removePlayer.dto;

import domain.game.GameId;
import domain.player.PlayerId;

public record RemovePlayerData(
        GameId gameId,
        PlayerId playerId,
        PlayerId playerToRemoveId
) {
}
