package interfaces.http.room.startGame;

import domain.game.GameId;
import domain.player.PlayerId;
import interfaces.http.room.startGame.dto.StartGameData;
import interfaces.http.room.startGame.dto.StartGameRequest;

public class StartGameMapper {
    public StartGameData toDomain(StartGameRequest request) {
        return new StartGameData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
