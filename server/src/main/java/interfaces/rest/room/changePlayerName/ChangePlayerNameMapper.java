package interfaces.rest.room.changePlayerName;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.rest.room.changePlayerName.dto.ChangePlayerNameData;
import interfaces.rest.room.changePlayerName.dto.ChangePlayerNameRequest;

public class ChangePlayerNameMapper {
    public ChangePlayerNameData toDomain(ChangePlayerNameRequest request) {
        return new ChangePlayerNameData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                request.newName()
        );
    }
}
