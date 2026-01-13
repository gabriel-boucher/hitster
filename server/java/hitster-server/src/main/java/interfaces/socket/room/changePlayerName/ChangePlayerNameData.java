package interfaces.socket.room.changePlayerName;

import domain.player.PlayerId;
import domain.room.RoomId;

public record ChangePlayerNameData(
        RoomId roomId,
        PlayerId playerId,
        String newName
) {
}
