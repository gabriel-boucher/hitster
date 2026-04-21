package interfaces.rest.room.startGame;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.rest.room.startGame.dto.StartGameData;
import interfaces.rest.room.startGame.dto.StartGameRequest;

public class StartGameMapper {
    public StartGameData toDomain(StartGameRequest request) {
        return new StartGameData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
