package interfaces.http.room.startGame;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.room.startGame.dto.StartGameData;

public class StartGameMapper {
    public StartGameData toDomain(String gameId, String playerId) {
        return new StartGameData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId)
        );
    }
}
