package interfaces.socket.room.mapper;

import domain.game.player.PlayerId;
import interfaces.socket.room.dto.createRoom.CreateRoomData;
import interfaces.socket.room.dto.createRoom.CreateRoomRequest;

public class CreateRoomMapper {
    public CreateRoomData toDomain(CreateRoomRequest request) {
        return new CreateRoomData(
                PlayerId.fromString(request.playerId())
        );
    }
}
