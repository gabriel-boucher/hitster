package interfaces.http.player.changePlayerColor.dto;

import domain.game.GameId;
import domain.player.PlayerColor;
import domain.player.PlayerId;

public record ChangePlayerColorData(
        GameId gameId,
        PlayerId playerId,
        PlayerColor newColor
) {
}
