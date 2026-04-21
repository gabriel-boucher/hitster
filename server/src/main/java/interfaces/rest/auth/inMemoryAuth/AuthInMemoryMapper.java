package interfaces.rest.auth.inMemoryAuth;

import domain.player.PlayerId;
import domain.room.RoomId;

public class AuthInMemoryMapper {
    public AuthInMemoryData toDomain(AuthInMemoryRequest request) {
        return new AuthInMemoryData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId())
        );
    }
}
