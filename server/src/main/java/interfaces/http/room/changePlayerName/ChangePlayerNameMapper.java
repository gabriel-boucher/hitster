package interfaces.http.room.changePlayerName;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.room.changePlayerName.dto.ChangePlayerNameData;
import interfaces.http.room.changePlayerName.dto.ChangePlayerNameRequest;

public class ChangePlayerNameMapper {
    public ChangePlayerNameData toDomain(ChangePlayerNameRequest request) {
        return new ChangePlayerNameData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                request.newName()
        );
    }
}
