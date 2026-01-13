package interfaces.socket.room.removePlayer;

import domain.player.PlayerId;
import domain.room.RoomId;

public record RemovePlayerData(
        RoomId roomId,
        PlayerId playerId,
        PlayerId playerToRemoveId
) {
}
