package interfaces.http.player.changePlayerMe;

import domain.game.GameId;
import domain.player.PlayerColor;
import domain.player.PlayerId;
import interfaces.http.player.changePlayerMe.dto.ChangePlayerMeData;
import interfaces.http.player.changePlayerMe.dto.ChangePlayerMeRequest;

public class ChangePlayerMeMapper {
    public ChangePlayerMeData toDomain(String gameId, String playerId, ChangePlayerMeRequest request) {
        return new ChangePlayerMeData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                isBlank(request.newName()) ? null : request.newName(),
                isBlank(request.newColor()) ? null : mapToPlayerColor(request.newColor())
        );
    }

    public PlayerColor mapToPlayerColor(String color) {
        return PlayerColor.valueOf(color.toUpperCase());
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
