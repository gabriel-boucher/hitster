package interfaces.http.room.startGame;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.http.room.startGame.dto.StartGameData;
import interfaces.http.room.startGame.dto.StartGameRequest;

public class StartGameMapper {
    public StartGameData toDomain(StartGameRequest request) {
        return new StartGameData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
