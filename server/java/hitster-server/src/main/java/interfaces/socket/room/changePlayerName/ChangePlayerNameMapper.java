package interfaces.socket.room.changePlayerName;

import domain.player.PlayerId;
import domain.room.RoomId;

public class ChangePlayerNameMapper {
    public ChangePlayerNameData toDomain(ChangePlayerNameRequest request) {
        return new ChangePlayerNameData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                request.newName()
        );
    }
}
