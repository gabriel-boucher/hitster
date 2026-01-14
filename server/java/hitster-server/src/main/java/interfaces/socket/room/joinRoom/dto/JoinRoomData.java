package interfaces.socket.room.joinRoom.dto;

import domain.player.PlayerId;
import domain.room.RoomId;

public record JoinRoomData(
        RoomId roomId,
        PlayerId playerId
) {
}
