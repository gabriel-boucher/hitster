package interfaces.socket.room.removePlayer;

import domain.player.PlayerId;
import domain.room.RoomId;

public class RemovePlayerMapper {
    public RemovePlayerData toDomain(RemovePlayerRequest request) {
        return new RemovePlayerData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                PlayerId.fromString(request.playerToRemoveId())
        );
    }
}
