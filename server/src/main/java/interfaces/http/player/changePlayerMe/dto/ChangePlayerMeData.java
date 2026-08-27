package interfaces.http.player.changePlayerMe.dto;

import domain.game.GameId;
import domain.player.PlayerColor;
import domain.player.PlayerId;

public record ChangePlayerMeData(
        GameId gameId,
        PlayerId playerId,
        String newName,
        PlayerColor newColor
) {
}
