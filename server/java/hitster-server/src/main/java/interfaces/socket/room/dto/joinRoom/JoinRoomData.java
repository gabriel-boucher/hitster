package interfaces.socket.room.dto.joinRoom;

import domain.player.PlayerId;
import domain.room.RoomId;

public record JoinRoomData(
        RoomId roomId,
        PlayerId playerId
) {
}
