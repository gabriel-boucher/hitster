package interfaces.http.player.removePlayer;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.player.removePlayer.dto.RemovePlayerData;
import interfaces.http.player.removePlayer.dto.RemovePlayerRequest;

public class RemovePlayerMapper {
    public RemovePlayerData toDomain(String gameId, String playerId, RemovePlayerRequest request) {
        return new RemovePlayerData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                PlayerId.fromString(request.playerToRemoveId())
        );
    }
}
