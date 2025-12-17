package interfaces.socket.game.dto.startGame;

import domain.game.player.PlayerId;
import domain.room.RoomId;

public record StartGameData(
        RoomId roomId,
        PlayerId playerId
) {
}
