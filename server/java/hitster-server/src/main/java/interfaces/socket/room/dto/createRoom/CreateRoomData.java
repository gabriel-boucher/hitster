package interfaces.socket.room.dto.createRoom;

import domain.player.PlayerId;

public record CreateRoomData(
        PlayerId playerId
) {
}
