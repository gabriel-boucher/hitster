package interfaces.http.player.changePlayerName;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.player.changePlayerName.dto.ChangePlayerNameData;
import interfaces.http.player.changePlayerName.dto.ChangePlayerNameRequest;

public class ChangePlayerNameMapper {
    public ChangePlayerNameData toDomain(String gameId, String playerId, ChangePlayerNameRequest request) {
        return new ChangePlayerNameData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                request.newName()
        );
    }
}
