package interfaces.socket.game.startGame;

import domain.player.PlayerId;
import domain.room.RoomId;

public class StartGameMapper {
    public StartGameData toDomain(StartGameRequest request) {
        return new StartGameData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
