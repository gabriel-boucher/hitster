package interfaces.rest.room.removePlayer;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.rest.room.removePlayer.dto.RemovePlayerData;
import interfaces.rest.room.removePlayer.dto.RemovePlayerRequest;

public class RemovePlayerMapper {
    public RemovePlayerData toDomain(RemovePlayerRequest request) {
        return new RemovePlayerData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                PlayerId.fromString(request.playerToRemoveId())
        );
    }
}
