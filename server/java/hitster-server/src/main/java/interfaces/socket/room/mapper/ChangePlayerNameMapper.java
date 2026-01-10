package interfaces.socket.room.mapper;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.socket.room.dto.changePlayerName.ChangePlayerNameData;
import interfaces.socket.room.dto.changePlayerName.ChangePlayerNameRequest;

public class ChangePlayerNameMapper {
    public ChangePlayerNameData toDomain(ChangePlayerNameRequest request) {
        return new ChangePlayerNameData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                request.newName()
        );
    }
}
