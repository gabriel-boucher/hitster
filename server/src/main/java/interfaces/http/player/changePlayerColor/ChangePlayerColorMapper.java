package interfaces.http.player.changePlayerColor;

import domain.game.GameId;
import domain.player.PlayerColor;
import domain.player.PlayerId;
import interfaces.http.player.changePlayerColor.dto.ChangePlayerColorData;
import interfaces.http.player.changePlayerColor.dto.ChangePlayerColorRequest;

public class ChangePlayerColorMapper {
    public ChangePlayerColorData toDomain(String gameId, String playerId, ChangePlayerColorRequest request) {
        return new ChangePlayerColorData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                mapToPlayerColor(request.newColor())
        );
    }

    public PlayerColor mapToPlayerColor(String color) {
        return PlayerColor.valueOf(color.toUpperCase());
    }
}
