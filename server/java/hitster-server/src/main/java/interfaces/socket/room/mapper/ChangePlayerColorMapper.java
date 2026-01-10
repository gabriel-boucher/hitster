package interfaces.socket.room.mapper;

import domain.player.PlayerColor;
import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.socket.room.dto.changePlayerColor.ChangePlayerColorData;
import interfaces.socket.room.dto.changePlayerColor.ChangePlayerColorRequest;

public class ChangePlayerColorMapper {
    public ChangePlayerColorData toDomain(ChangePlayerColorRequest request) {
        return new ChangePlayerColorData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                mapToPlayerColor(request.newColor())
        );
    }

    public PlayerColor mapToPlayerColor(String color) {
        return PlayerColor.valueOf(color.toUpperCase());
    }
}
