package interfaces.http.room.removePlayer;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.room.removePlayer.dto.RemovePlayerData;
import interfaces.http.room.removePlayer.dto.RemovePlayerRequest;

public class RemovePlayerMapper {
    public RemovePlayerData toDomain(RemovePlayerRequest request) {
        return new RemovePlayerData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                PlayerId.fromString(request.playerToRemoveId())
        );
    }
}
