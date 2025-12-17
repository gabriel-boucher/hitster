package interfaces.socket.room.dto.createRoom;

import domain.game.player.PlayerId;

public record CreateRoomData(
        PlayerId playerId
) {
}
