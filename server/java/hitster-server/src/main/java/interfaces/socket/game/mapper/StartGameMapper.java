package interfaces.socket.game.mapper;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.socket.game.dto.startGame.StartGameData;
import interfaces.socket.game.dto.startGame.StartGameRequest;

public class StartGameMapper {
    public StartGameData toDomain(StartGameRequest request) {
        return new StartGameData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
