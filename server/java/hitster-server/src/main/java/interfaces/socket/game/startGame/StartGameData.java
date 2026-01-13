package interfaces.socket.game.startGame;

import domain.player.PlayerId;
import domain.room.RoomId;

public record StartGameData(
        RoomId roomId,
        PlayerId playerId
) {
}
