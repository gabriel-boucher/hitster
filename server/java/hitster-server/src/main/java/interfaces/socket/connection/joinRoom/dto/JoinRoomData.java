package interfaces.socket.connection.joinRoom.dto;

import domain.player.PlayerId;
import domain.room.RoomId;

public record JoinRoomData(
        RoomId roomId,
        PlayerId playerId
) {
}
