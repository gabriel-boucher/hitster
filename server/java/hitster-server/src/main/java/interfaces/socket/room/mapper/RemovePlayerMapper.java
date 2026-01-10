package interfaces.socket.room.mapper;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.socket.room.dto.removePlayer.RemovePlayerData;
import interfaces.socket.room.dto.removePlayer.RemovePlayerRequest;

public class RemovePlayerMapper {
    public RemovePlayerData toDomain(RemovePlayerRequest request) {
        return new RemovePlayerData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                PlayerId.fromString(request.playerToRemoveId())
        );
    }
}
