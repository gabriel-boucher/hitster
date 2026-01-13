package interfaces.socket.room.createRoom;

import domain.spotify.accessToken.AccessCode;

public class CreateRoomMapper {
    public CreateRoomData toDomain(CreateRoomRequest request) {
        return new CreateRoomData(
                new AccessCode(request.accessCode())
        );
    }
}
