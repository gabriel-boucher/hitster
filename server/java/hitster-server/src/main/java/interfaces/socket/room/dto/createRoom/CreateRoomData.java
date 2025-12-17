package interfaces.socket.room.dto.createRoom;

import domain.game.player.PlayerId;
import domain.room.RoomId;

public record CreateRoomData(
        RoomId roomId,
        PlayerId playerId
) {
}
