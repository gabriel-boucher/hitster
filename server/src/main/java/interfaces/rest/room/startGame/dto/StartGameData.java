package interfaces.rest.room.startGame.dto;

import domain.player.PlayerId;
import domain.room.RoomId;

public record StartGameData(
        RoomId roomId,
        PlayerId playerId
) {
}
