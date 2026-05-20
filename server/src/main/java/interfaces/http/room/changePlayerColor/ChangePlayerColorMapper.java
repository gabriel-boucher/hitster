package interfaces.http.room.changePlayerColor;

import domain.game.GameId;
import domain.player.PlayerColor;
import domain.player.PlayerId;
import interfaces.http.room.changePlayerColor.dto.ChangePlayerColorData;
import interfaces.http.room.changePlayerColor.dto.ChangePlayerColorRequest;

public class ChangePlayerColorMapper {
    public ChangePlayerColorData toDomain(ChangePlayerColorRequest request) {
        return new ChangePlayerColorData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                mapToPlayerColor(request.newColor())
        );
    }

    public PlayerColor mapToPlayerColor(String color) {
        return PlayerColor.valueOf(color.toUpperCase());
    }
}
