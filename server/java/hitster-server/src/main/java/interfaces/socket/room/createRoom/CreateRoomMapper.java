package interfaces.socket.room.createRoom;

import domain.spotify.accessToken.AccessCode;
import interfaces.socket.room.createRoom.dto.CreateRoomData;
import interfaces.socket.room.createRoom.dto.CreateRoomRequest;

public class CreateRoomMapper {
    public CreateRoomData toDomain(CreateRoomRequest request) {
        return new CreateRoomData(
                new AccessCode(request.accessCode())
        );
    }
}
